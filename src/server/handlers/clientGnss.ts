import mqtt from 'mqtt';

interface GNSSMessage {
    t: number;
    p: {
        lt: number;
        ln: number;
        s: number;
    };
}

const handleClientGnss = (
    topic: string,
    message: GNSSMessage,
    client: mqtt.MqttClient
) => {
    const { t, p } = message;
    console.log(`Received GNSS message from ${topic}:`, p);

    // Обработка данных, например, запись в базу
};

export default handleClientGnss;
