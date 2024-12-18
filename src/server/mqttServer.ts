import mqtt from 'mqtt';
import handleClientInitiate from './handlers/clientInitiate';
import handleClientData from './handlers/clientData';
import handleClientGnss from './handlers/clientGnss';
import logger from '../utils/logger';

const MQTT_BROKER_URL = 'mqtt://srv.protok.by:17983';
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
    logger.info('Connected to MQTT broker');

    const topics = [
        'telemetry/+/client/initiate/+',
        'telemetry/+/client/data/+',
        'telemetry/+/client/gnss/+',
    ];

    topics.forEach((topic) => client.subscribe(topic, (err) => {
        if (err) logger.error(`Failed to subscribe to topic: ${topic}`);
        else logger.info(`Subscribed to topic: ${topic}`);
    }));
});
client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());

        if (topic.includes('client/initiate')) {
            handleClientInitiate(topic, data, client);
        } else if (topic.includes('client/data')) {
            handleClientData(topic, data);
        } else if (topic.includes('client/gnss')) {
            handleClientGnss(topic, data, client);
        }
    } catch (error) {
        logger.error(`Error processing message on topic ${topic}: ${error}`);
    }
});

export default client;
