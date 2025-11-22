import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

// URL do broker
let MQTT_BROKER_URL = process.env.MQTT_BROKER_URL; 

if (!MQTT_BROKER_URL) {
    throw new Error("MQTT_BROKER_URL não está definido nas variáveis de ambiente.");
    MQTT_BROKER_URL = "mqtt://broker.hivemq.com:1883";
}

// Tópicos de inscrição
const TOPICS = ["casa/cozinha/gas"];

export const connectMQTT = () => {
    console.log(`Tentando conectar ao Broker em: ${MQTT_BROKER_URL}`);

    const client = mqtt.connect(MQTT_BROKER_URL, {
        clientId: `backend_monitor_${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
    });

    client.on("connect", () => {
        console.log("====== Conectado ao Broker MQTT com sucesso! ======");
        
        client.subscribe(TOPICS, (err) => {
            if (err) {
                console.error("===== Erro ao se inscrever: =====", err);
            } else {
                console.log(`===== Inscrito nos tópicos: ${TOPICS.join(", ")} =====`);
            }
        });
    });

    client.on("message", (topic, message) => {
        // Converter o buffer da mensagem para String
        const payload = message.toString();
        console.log(`====== Recebido [${topic}]: ${payload} ======`);
        
    });

    client.on("error", (err) => {
        console.error("====== Erro na conexão MQTT: ======", err);
        client.end();
    });
    
    return client;
};