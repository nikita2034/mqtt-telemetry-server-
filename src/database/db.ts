// import { Sequelize } from 'sequelize';
// import logger from '../utils/logger';

// // Настройки подключения
// const sequelize = new Sequelize('version_from_Vlad', 'postgres', '12345678', {
//     host: '192.168.43.32', // Укажите IP-адрес удаленного сервера
//     dialect: 'postgres',   // Используемый диалект (PostgreSQL)
//     logging: console.log,        // Отключение логирования SQL-запросов
//     port: 5432,            // Порт подключения (обычно 5432 для PostgreSQL)
// });

// // Проверка подключения
// (async () => {
//     try {
//         await sequelize.authenticate();
//         logger.info('Соединение с базой данных успешно установлено.');
//     } catch (error) {
//         logger.error(`Ошибка подключения к базе данных:, ${error}`);
//     }
// })();

// export { sequelize };

import { Sequelize } from 'sequelize';

// Настройки подключения
const sequelize = new Sequelize('client_vehicle_tracking', 'postgres', '1256', {
    host: 'db', // Укажите IP-адрес удаленного сервера
    dialect: 'postgres',   // Используемый диалект (PostgreSQL)
    logging: console.log,        // Отключение логирования SQL-запросов
    port: 5432,            // Порт подключения (обычно 5432 для PostgreSQL)
});

// Проверка подключения
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных успешно установлено.');
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
    }
})();

export { sequelize };