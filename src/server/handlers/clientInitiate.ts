import mqtt from 'mqtt';
import Transport from '../../database/models/transport';

interface InitiateDataTransmissionMessage {
    t: number;
    p: {
        uid_can: number;
        vin: string;
        mess: Array<{
            c: number;
            i: number;
            t: number;
        }>;
    };
}

const handleClientInitiate = async (
    topic: string,
    message: InitiateDataTransmissionMessage,
    client: mqtt.MqttClient
) => {
    const { t, p } = message;
    const vin = p.vin;

    console.log(`Received initiation request from ${topic}:`, p);

    try {
        const topicParts = topic.split('/');
        const uid_hw = topicParts[topicParts.length - 1];

        let transport = await Transport.findOne({ where: { vin } });

        if (!transport) {
            transport = await Transport.create({
                vin, received_count: 0, block_id: uid_hw
            });
            console.log(`Created new transport with VIN: ${vin}`);
        } else {
            console.log('Транспорт есть в системе')
        }
        const responseTopic = `telemetry/maz/server/created/${uid_hw}`;
        const response = {
            t: Math.floor(Date.now() / 1000),
            p: {
                cnt: transport.received_count,
                mess: p.mess,
            },
        };

        client.publish(responseTopic, JSON.stringify(response), { retain: false }, (err) => {
            if (err) {
                console.error(`Error publishing to ${responseTopic}:`, err);
            } else {
                console.log(`Response sent to ${responseTopic}, ${JSON.stringify(response)}`);
            }
        });
    } catch (err) {
        console.error('Error handling client initiation:', err);
    }
};

export default handleClientInitiate;
