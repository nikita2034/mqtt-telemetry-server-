import { Sequelize } from 'sequelize';

// Настройки подключения
const sequelize = new Sequelize('client_vehicle_tracking', 'postgres', '1256', {
    host: 'localhost', // Укажите IP-адрес удаленного сервера
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
