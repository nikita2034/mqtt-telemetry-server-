import parametersMapping from "../data-structure/parametersMapping";

// Утилита для извлечения значения из буфера
const extractValue = (
  buffer: Buffer,
  byte: number | number[], // Может быть числом или массивом
  bits?: number[], // Биты могут быть необязательными
  coefficient = 1,
  offset = 0,
  mapping?: Record<number, string>
): any => {
  let extractedValue = 0;

  // Преобразуем одиночный `byte` в массив для унификации обработки
  const byteArray = Array.isArray(byte) ? byte : [byte];

  // Обрабатываем указанные байты
  byteArray.forEach((byteIndex, i) => {
    const byteValue = buffer[byteIndex]; // Чтение байта из буфера

    if (bits && bits[i] !== undefined) {
      // Если указаны биты, выделяем их
      const bitOffset = bits[i]; // Позиция бита
      const mask = 1 << bitOffset; // Маска для выделения бита
      const bitValue = (byteValue & mask) >> bitOffset; // Извлекаем значение бита
      extractedValue = (extractedValue << 1) | bitValue; // Сдвигаем и добавляем бит
    } else {
      // Если бит не указан, берем весь байт
      extractedValue = (extractedValue << 8) | byteValue; // Объединяем байты
    }
  });

  // Применяем коэффициент и смещение
  let finalValue = extractedValue * coefficient + offset;

  // Если указано сопоставление (mapping), преобразуем значение
  if (mapping && mapping.hasOwnProperty(finalValue)) {
    return mapping[finalValue];
  }

  return finalValue;
};

export const processMessage = (
  messageId: string, // Идентификатор сообщения
  buffer: Buffer, // Буфер с данными
  timestamp: number, // Временная метка
  uid: string // Идентификатор устройства
) => {
  const groupedData: Record<string, any> = {}; // Для группировки данных по таблицам
  // Находим маппинг для данного идентификатора
  const mapping = parametersMapping.find((m: { id: string }) => m.id === messageId);
  if (!mapping) {
    console.warn(`No mapping found for ID ${messageId}`);
    return groupedData; // Возвращаем пустой объект, если маппинг не найден
  }

  mapping.positions.forEach(({ byte, bits, table, field, coefficient, offset, mapping }) => {
    // Преобразуем byte и bits в массивы, если это одиночные значения
    const byteArray = Array.isArray(byte) ? byte : [byte]; // Если byte не массив, делаем его массивом
    const bitArray = Array.isArray(bits) ? bits : [bits]; // Если bits не массив, делаем его массивом

    byteArray.forEach((b, index) => {
      const bitCount = bitArray[index] !== undefined ? bitArray[index] : 0; // Проверка на тип number
      const coef = typeof coefficient === 'number' ? coefficient : 1; // Если coefficient не определен, ставим по умолчанию 1
      const off = typeof offset === 'number' ? offset : 0; // Если offset не определен, ставим по умолчанию 0
      const map: Record<number, string> = typeof mapping === 'object' && mapping !== null ? mapping : {};

      const value = extractValue(buffer, [b], [bitCount], coef, off, map); // Извлекаем значение

      // Проверяем, существует ли таблица в groupedData, и если нет, инициализируем её
      if (!groupedData[table]) {
        groupedData[table] = {};
      }

      // Добавляем значение в соответствующее поле
      groupedData[table][field] = value;
    });
  });
  return groupedData; // Возвращаем сгруппированные данные
};

// Функция для преобразования шестнадцатеричной строки в Buffer
export const hexStringToBuffer = (hexString: string): Buffer => {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error("Invalid hex string");
  }
  return Buffer.from(hexString, 'hex');
};
