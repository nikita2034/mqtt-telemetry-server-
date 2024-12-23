import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
    level: 'info', // Уровень логирования
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new transports.Console(), // Логи в консоль
        new transports.File({ filename: 'logs/server.log' }), // Логи в файл
    ]
});

// Добавляем транспорт для ошибок
logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));

export default logger;
