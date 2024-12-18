import mqtt from 'mqtt';
import Transport from '../../database/models/transport'; // Импорт модели

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
        // Извлечение {uid_hw} из топика
        const topicParts = topic.split('/');
        const uid_hw = topicParts[topicParts.length - 1]; // Последняя часть топика — это UID оборудования

        // Проверяем наличие VIN в базе данных
        let transport = await Transport.findOne({ where: { vin } });

        if (!transport) {
            // VIN отсутствует, создаём запись
            transport = await Transport.create({
                vin, received_count: 0, block_id:uid_hw
            });
            console.log(`Created new transport with VIN: ${vin}`);
        } else {
            // Обновляем количество полученных пакетов
            // transport.received_count = (transport.received_count || 0) ;
            // await transport.save();
            // console.log(`Updated transport with VIN: ${id}, new count: ${transport.received_count}`);
            console.log('Транспорт есть в системе')
        }

        // Формируем ответное сообщение
        const responseTopic = `telemetry/protok/server/created/${uid_hw}`; // Динамически формируем ответный топик
        const response = {
            t: Math.floor(Date.now() / 1000), // Текущее время
            p: {
                cnt: transport.received_count, // Отправляем обновлённое количество пакетов
                mess: p.mess, // Массив сообщений
            },
        };

        // Отправляем сообщение в MQTT
        client.publish(responseTopic, JSON.stringify(response),  { retain: false }, (err) => { // ? RETAIN FALSE OR TRUE?
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
