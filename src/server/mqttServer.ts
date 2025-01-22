import mqtt, { MqttClient } from 'mqtt';
import handleClientInitiate from './handlers/clientInitiate';
import handleClientData from './handlers/clientData';
import logger from '../utils/logger';

const MQTT_BROKER_URL = 'mqtt://srv.protok.by:17983';

const client: MqttClient = mqtt.connect(MQTT_BROKER_URL);
const stressTestFunction = () => {
    console.log("Начало теста нагрузки...");
  
    // Генерация большого массива случайных чисел
    const generateLargeArray = () => {
      const size = 100_000_000; // Размер массива
      return Array.from({ length: size }, () => Math.random());
    };
  
    // Рекурсивное вычисление чисел Фибоначчи
    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };
  
    // Интенсивные вычисления
    const performCalculations = () => {
      console.time("Сортировка большого массива");
      const largeArray = generateLargeArray();
      largeArray.sort((a, b) => a - b); // Сортировка
      console.timeEnd("Сортировка большого массива");
  
      console.time("Вычисление чисел Фибоначчи");
      const fibResult = fibonacci(40); // Рекурсивное вычисление (40 — тяжелое значение)
      console.timeEnd("Вычисление чисел Фибоначчи");
  
      console.log(`Результат вычисления Фибоначчи: ${fibResult}`);
    };
  
    performCalculations();
    console.log("Тест нагрузки завершен.");
  };
stressTestFunction();
client.on('connect', () => {
    logger.info('Connected to MQTT broker');

    const topics: string[] = [
        'telemetry/maz/client/initiate/+',
        'telemetry/maz/client/data/+',
    ];

    topics.forEach((topic) =>
        client.subscribe(topic, (err) => {
            if (err) {
                logger.error(`Failed to subscribe to topic: ${topic}`);
            } else {
                logger.info(`Subscribed to topic: ${topic}`);
            }
        })
    );
});

client.on('message', (topic: string, message: Buffer) => {
    try {
        const data = JSON.parse(message.toString());
        logger.info(`Received message on topic ${topic}: ${JSON.stringify(data)}`);

        if (topic.includes('client/initiate')) {
            handleClientInitiate(topic, data, client);
            logger.info('Processed client initiation message');
        } else if (topic.includes('client/data')) {
            handleClientData(topic, data);
            logger.info('Processed client data message');
        }
    } catch (error) {
        logger.error(`Error processing message on topic ${topic}: ${error}`);
    }
});

export default client;

