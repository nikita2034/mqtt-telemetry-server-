import { sequelize } from '../../database/db';
import { getModelByName } from '../../database/models/getModelByName';
import { processMessage } from '../../utils/processMessage';
import { hexStringToBuffer } from '../../utils/processMessage';
import { Transport } from '../../database/models';
import logger from '../../utils/logger';
const handleClientData = async (
  topic: string,
  message: DataSessionMessage,
) => {
  const { t: timestamp, p } = message;
  const { cnt, mess } = p;

  console.log(`'ТОПИК И ДАННЫЕ',${topic},${JSON.stringify(message, null, 2)}`);
  if (!cnt || !mess || !Array.isArray(mess)) {
    console.error('Некорректный формат сообщения, отсутствуют или некорректны count или message array');
    logger.error('Некорректный формат сообщения, отсутствуют или некорректны count или message array');
    return;
  }

  const topicParts = topic.split('/');
  const uid_hw = topicParts[topicParts.length - 1];

  const groupedData: Record<string, any[]> = {};
  const createdIds: Record<string, number[]> = {};

  const transportsModel = getModelByName('transports') as typeof Transport;
if (!transportsModel) {
  console.error('Модель для Transports не найдена');
  logger.error('Модель для Transports не найдена');
  return;
}

  const transport = await transportsModel.findOne({ where: { block_id: uid_hw } });
  if (!transport) {
    console.error(`Транспорт с block_id ${uid_hw} не найден.`);
    logger.error(`Транспорт с block_id ${uid_hw} не найден.`);
    return;
  }

  const id_transport = transport.id;

  for (const { i, d } of mess) {
    try {
      const buffer = hexStringToBuffer(d);
      const idAsHex = parseInt(i, 10).toString(16).toUpperCase().padStart(8, '0');
      const messageData = processMessage(idAsHex, buffer, timestamp, uid_hw);

      Object.entries(messageData).forEach(([table, record]) => {
        if (!groupedData[table]) {
          groupedData[table] = [];
        }
        if (table === 'locations') {
          record.data = timestamp; // Добавляем дату из сообщения
          record.id_transport = id_transport; // Добавляем id_transport
        }
        groupedData[table].push(record);
      });
    } catch (error) {
      console.error(`Ошибка обработки сообщения с ID ${i}:`, error);
      logger.error(`Ошибка обработки сообщения с ID ${i}:`, error);
    }
  }

  try {
    await sequelize.transaction(async (transaction: any) => {
      for (const [table, records] of Object.entries(groupedData)) {
        try {
          const Model = getModelByName(table);
          if (!Model) {
            throw new Error(`Модель для таблицы ${table} не найдена`);
          }

          const mergedRecord = [records.reduce((acc, record) => {
            return { ...acc, ...record };
          }, {})];

          console.log('Очищенные данныфе records:', mergedRecord);
          logger.info('Очищенные данныфе records:', mergedRecord);
          const createdRecords = await Model.bulkCreate(mergedRecord, {
            transaction,
            returning: true,
          });

          console.log('Созданные записи:', createdRecords);
          logger.info('Созданные записи:', createdRecords);
          createdIds[table] = createdRecords.map((record: any) => record.id);
          console.log(`Записи успешно вставлены в ${table}:`, createdRecords);
          logger.info(`Записи успешно вставлены в ${table}:`, createdRecords);
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
          const date = new Date(timestamp * 1000); 
          console.log("date",date)
          const transportDataRecords = [{
            block_id: uid_hw,
            date: date,
            ...Object.keys(createdIds).reduce((acc: Record<string, number | null>, table) => {
              const idKey = `id_${table}`;
              acc[idKey] = createdIds[table]?.[0] || null;
              return acc;
            }, {}),
          }];

          console.log('Итоговые записи для транспорных данных:', transportDataRecords);
          logger.info('Итоговые записи для транспорных данных:', transportDataRecords);
          await transportDataModel.bulkCreate(transportDataRecords, { transaction });
          console.log('Данные транспорта успешно сохранены в базе данных.');
          logger.info('Данные транспорта успешно сохранены в базе данных.');
          await transportsModel.update(
            {
              received_count: cnt,
            },
            {
              where: { block_id: uid_hw },
              transaction,
            }
          );
          console.log('Поле received_count успешно обновлено в таблице transports.');
          logger.info('Поле received_count успешно обновлено в таблице transports.');
        } catch (error) {
          console.error('Ошибка при сохранении данных транспорта в TransportsData или обновлении received_count:', error);
          logger.error('Ошибка при сохранении данных транспорта в TransportsData или обновлении received_count:', error);
        }
      } else {
        console.log('Нет данных для сохранения в таблицу transports_data, пропуск сохранения.');
        logger.error('Нет данных для сохранения в таблицу transports_data, пропуск сохранения.');
      }
    });
  } catch (error) {
    console.error('Ошибка при сохранении данных в базу данных во время транзакции:', error);
    logger.error('Ошибка при сохранении данных в базу данных во время транзакции:', error);
  }
};

export default handleClientData;
