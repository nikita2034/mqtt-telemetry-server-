import { sequelize } from '../../database/db';
import { getModelByName } from '../../database/models/getModelByName';
import { processMessage } from '../../utils/processMessage';
import { hexStringToBuffer } from '../../utils/processMessage';

const handleClientData = async (
  topic: string,
  message: DataSessionMessage,
) => {
  const { t: timestamp, p } = message;
  const { cnt, mess } = p;


  console.log(`'ТОПИК И ДАННЫЕ',${topic},${JSON.stringify(message, null, 2)}`)
  if (!cnt || !mess || !Array.isArray(mess)) {
    console.error('Некорректный формат сообщения, отсутствуют или некорректны count или message array');
    return;
  }

  const topicParts = topic.split('/');
  const uid_hw = topicParts[topicParts.length - 1]; // ID транспортного средства

  const groupedData: Record<string, any[]> = {}; // Для хранения сгруппированных данных по таблицам
  const createdIds: Record<string, number[]> = {}; // Для хранения ID созданных записей

  // Обрабатываем каждое сообщение в массиве
  for (const { i, d } of mess) {
    try {
      const buffer = hexStringToBuffer(d); // Преобразуем данные в буфер
      const idAsHex = parseInt(i, 10).toString(16).toUpperCase().padStart(8, '0');
      const messageData = processMessage(idAsHex, buffer, timestamp, uid_hw);
  
      Object.entries(messageData).forEach(([table, record]) => {
        if (!groupedData[table]) {
          groupedData[table] = [];
        }
        groupedData[table].push(record);
      });
    } catch (error) {
      console.error(`Ошибка обработки сообщения с ID ${i}:`, error);
    }
  }
try {
  await sequelize.transaction(async (transaction: any) => {
    // Сначала сохраняем данные в таблицы
    for (const [table, records] of Object.entries(groupedData)) {
      try {
        const Model = getModelByName(table);
        if (!Model) {
          throw new Error(`Модель для таблицы ${table} не найдена`);
        }

        const mergedRecord = [records.reduce((acc, record) => {
          return { ...acc, ...record };
        }, {})];

        console.log("Очищенные данные records:", mergedRecord);

        const createdRecords = await Model.bulkCreate(mergedRecord, {
          transaction,
          returning: true, // Это указывает Sequelize вернуть созданные записи
        });

        console.log("Созданные записи:", createdRecords);
        createdIds[table] = createdRecords.map((record: any) => record.id); // Проверка наличия поля `id`
        console.log(`Записи успешно вставлены в ${table}:`, createdRecords);
      } catch (error) {
        console.error(`Ошибка при сохранении записей в таблицу ${table}:`, error);
      }
    }

    if (Object.values(createdIds).some(ids => ids.length > 0)) {
      try {
        const transportDataModel = getModelByName('transports_data');
        if (!transportDataModel) {
          throw new Error('Модель для TransportsData не найдена');
        }

        const transportDataRecords = [{
          blcok_id: uid_hw, // Используем UID транспортного средства
          date: new Date(), // Текущая дата
          ...Object.keys(createdIds).reduce((acc: Record<string, number | null>, table) => {
            const idKey = `id_${table}`;
            acc[idKey] = createdIds[table]?.[0] || null; // Берем только первый ID
            return acc;
          }, {}),
        }];

        console.log("Итоговые записи для транспорных данных:", transportDataRecords);
        await transportDataModel.bulkCreate(transportDataRecords, { transaction });
        console.log('Данные транспорта успешно сохранены в базе данных.');

        // Обновление поля received_count в таблице transports
        const transportsModel = getModelByName('transports');
        if (!transportsModel) {
          throw new Error('Модель для Transports не найдена');
        }

        // Обновляем поле received_count для transport по block_id
        await transportsModel.update(
          {
            received_count: cnt // Увеличиваем на 1
          },
          {
            where: { block_id: uid_hw },
            transaction // Используем транзакцию
          }
        );
        console.log('Поле received_count успешно обновлено в таблице transports.');
        
      } catch (error) {
        console.error('Ошибка при сохранении данных транспорта в TransportsData или обновлении received_count:', error);
      }
    } else {
      console.log('Нет данных для сохранения в таблицу transports_data, пропуск сохранения.');
    }
  });
} catch (error) {
  console.error('Ошибка при сохранении данных в базу данных во время транзакции:', error);
}

}
export default handleClientData;
