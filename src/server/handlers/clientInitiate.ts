import mqtt from 'mqtt';
import Transport from '../../database/models/transport';
import trackingStructure from '../../data-structure/initiateDataTransmissionMessage';
import { Parameter } from '../../types/Parameter';
import logger from '../../utils/logger';
interface InitiateDataTransmissionMessage {
    t: number;
    p: {
        uid_can: number;
        vin: string;
        mess: Array<Parameter>;
    };
}


const handleClientInitiate = async (
    topic: string,
    message: InitiateDataTransmissionMessage,
    client: mqtt.MqttClient
) => {
    const { t, p } = message;
    const id = p.vin;

    console.log(`Received initiation request from ${topic}:`, p);

    try {
        const topicParts = topic.split('/');
        const uid_hw = topicParts[topicParts.length - 1];

        let transport = await Transport.findOne({ where: { id } });

        if (!transport) {
            transport = await Transport.create({
                id,
                received_count: 0,
                block_id: uid_hw,
            });
            console.log(`Created new transport with VIN: ${id}`);
        } else {
            console.log(`Transport with VIN: ${id} already exists in the system`);
        }

        const parametersToTrack = trackingStructure.get(id);

        if (!trackingStructure.has(id)) {
            console.log(`VIN ${id} not found in tracking structure. Using default parameters from the message:`, p.mess);
            trackingStructure.set(id, p.mess); // Сохраняем параметры из сообщения в структуру
        } else {
            console.log(`Using predefined parameters for VIN ${id}:`, parametersToTrack);
        }

        // Формируем ответ
        const responseTopic = `telemetry/maz/server/created/${uid_hw}`;
        const response = {
            t: Math.floor(Date.now() / 1000),
            p: {
                cnt: transport.received_count,
                mess: parametersToTrack, 
            },
        };

        client.publish(responseTopic, JSON.stringify(response), { retain: true }, (err) => {
            if (err) {
                console.error(`Error publishing to ${responseTopic}:`, err);
            } else {
                console.log(`Response sent to ${responseTopic}:`, JSON.stringify(response));
                logger.info(`Response sent to ${responseTopic}:, ${JSON.stringify(response)}`);
            }
        });
    } catch (err) {
        console.error('Error handling client initiation:', err);
    }
};

export default handleClientInitiate;
