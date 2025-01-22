import parametersMapping from "../data-structure/parametersMapping";

export const extractValue = (
  buffer: Buffer,
  bytes: number | number[],
  bits?: number | number[],
  coefficient = 1,
  offset = 0,
  mapping?: Record<number, string>
): any => {
  let extractedValue = 0;

  // Если передан массив байтов, используем его, иначе создаём массив с единственным значением
  const byteArray = Array.isArray(bytes) ? bytes : [bytes];
  const bitArray = Array.isArray(bits) ? bits : bits !== undefined ? [bits] : undefined;

  if (!bitArray) {
    // Если байты указаны в прямом порядке
    byteArray.forEach((byteIndex) => {
      const byteValue = buffer[byteIndex];
      extractedValue = (extractedValue << 8) | byteValue;
      extractedValue = extractedValue >>> 0; // Преобразуем в беззнаковое 32-битное число

      console.log(`byteValue (0x${byteValue.toString(16)}) => extractedValue (0x${extractedValue.toString(16)})`);
    });
  } else {
    // Если есть биты, извлекаем их
    byteArray.forEach((byteIndex, i) => {
      const byteValue = buffer[byteIndex];

      if (bitArray && bitArray[i] !== undefined) {
        const bitOffset = bitArray[i];
        const mask = 1 << bitOffset;
        const bitValue = (byteValue & mask) >> bitOffset;

        extractedValue = (extractedValue << 1) | bitValue;
        extractedValue = extractedValue >>> 0;  // Преобразуем в беззнаковое 32-битное число

        console.log("extractedValue", extractedValue);
      }
    });
  }

  // Применяем коэффициент и смещение
  const finalValue = extractedValue * coefficient + offset;

  // Если есть маппинг и найдено соответствие, возвращаем значение
  if (mapping && mapping.hasOwnProperty(finalValue)) {
    return mapping[finalValue];  // Возвращаем строковое значение из маппинга
  }

  return finalValue;  // Если нет маппинга, возвращаем числовое значение
};

export const processMessage = (
  messageId: string,
  buffer: Buffer,
  timestamp: number,
  uid: string
) => {
  const groupedData: Record<string, any> = {};

  const mapping = parametersMapping.find((m: { id: string }) => m.id === messageId);

  if (!mapping) {
    console.warn(`No mapping found for ID ${messageId}`);
    return groupedData;
  }

  mapping.positions.forEach(({ byte, bits, table, field, coefficient, offset, mapping }) => {
    const coef = typeof coefficient === 'number' ? coefficient : 1;
    const off = typeof offset === 'number' ? offset : 0;
    const map: Record<number, string> =
      typeof mapping === 'object' && mapping !== null ? mapping : {};

    const value = extractValue(buffer, byte, bits, coef, off, map);

    if (!groupedData[table]) {
      groupedData[table] = {};
    }

    groupedData[table][field] = value;
  });

  return groupedData;
};



export const hexStringToBuffer = (hexString: string): Buffer => {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error("Invalid hex string");
  }
  return Buffer.from(hexString, 'hex');
};
