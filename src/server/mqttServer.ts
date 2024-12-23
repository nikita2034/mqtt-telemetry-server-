import mqtt, { MqttClient } from 'mqtt';
import handleClientInitiate from './handlers/clientInitiate';
import handleClientData from './handlers/clientData';
import logger from '../utils/logger';

const MQTT_BROKER_URL = 'mqtt://srv.protok.by:17983';

const client: MqttClient = mqtt.connect(MQTT_BROKER_URL);

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
