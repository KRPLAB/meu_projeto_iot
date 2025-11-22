import mqtt from "mqtt";
import dotenv from "dotenv";
import { postLeitura } from "../services/leitura/";

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
        clean: false,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
    });

    client.on('connect', () => {
        console.log('Conectado ao Broker MQTT com sucesso!');
        client.subscribe(TOPICS);
    });

    client.on("message", async (topic, message) => {
        try {
            const payloadStr = message.toString();
            console.log(`Recebido [${topic}]: ${payloadStr}`);

            const payload = JSON.parse(payloadStr);

            if (payload.sensor_id && payload.valor) {
                await postLeitura({
                    sensor_id: payload.sensor_id,
                    valor: payload.valor,
                });
                console.log("====== Leitura registrada no banco de dados ======");
            } else {
                console.error("===== Payload inválido recebido =====");
            }
        } catch (error) {
            console.error("===== Erro ao processar a mensagem recebida: =====", error);
        }
    });

    client.on("error", (err) => {
        console.error("====== Erro na conexão MQTT: ======", err);
        client.end();
    });
        
    return client;
};