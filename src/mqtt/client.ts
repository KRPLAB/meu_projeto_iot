import mqtt from "mqtt";
import dotenv from "dotenv";
import { registrarLeitura } from "@/services/leitura";
import { criarAlerta } from "@/services/alerta";
import { prisma } from '@/config/database';

dotenv.config();

// URL do broker
let MQTT_BROKER_URL = process.env.MQTT_BROKER_URL; 

if (!MQTT_BROKER_URL) {
    throw new Error("MQTT_BROKER_URL não está definido nas variáveis de ambiente.");
    MQTT_BROKER_URL = "mqtt://broker.hivemq.com:1883";
}


// Tópicos de inscrição no padrão solicitado
const TOPICS = ["+/sensores/leituras/+", "+/sensores/alertas/+"];

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
        client.subscribe('dispositivos/registro');
    });

    client.on("message", async (topic, message) => {
        try {
            const payloadStr = message.toString();
            console.log(`Recebido [${topic}]: ${payloadStr}`);

            if (topic === 'dispositivos/registro') {
                const { mac_address } = JSON.parse(payloadStr);
                let dispositivo = await prisma.dispositivos.findUnique({ where: { mac_address } });
                if (!dispositivo) {
                    dispositivo = await prisma.dispositivos.create({ data: { mac_address, status: 'online' } });
                }
                const uuid = dispositivo.uuid;
                const responseTopic = `dispositivos/registro/${mac_address}`;
                client.publish(responseTopic, JSON.stringify({ uuid }));
                console.log(`Registrado ESP: ${mac_address} -> ${uuid}`);
                return;
            }

            const payload = JSON.parse(payloadStr);
            // Extrai dispositivoId e sensorId do tópico
            // Exemplo: "123/sensores/leituras/5"
            const [dispositivoId, , tipo, sensorId] = topic.split("/");

            if (tipo === "leituras" && payload.valor) {
                await registrarLeitura(Number(sensorId), payload.valor);
                console.log("====== Leitura registrada no banco de dados ======");
            } else if (tipo === "alertas" && payload.nivel && payload.mensagem) {
                await criarAlerta(Number(sensorId), payload.nivel, payload.mensagem);
                console.log("====== Alerta registrado no banco de dados ======");
            } else {
                console.error("===== Payload ou tópico inválido recebido =====");
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