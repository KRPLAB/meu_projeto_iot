import { connectMQTT } from "./mqtt/client";

console.log("Hello World!");
console.log("🚀 Sistema de Monitoramento de Gás Iniciado!");

// Conectar ao broker MQTT
const mqttClient = connectMQTT();

// simulando loop de serviço rodando
setInterval(() => {
    const dataHora = new Date().toLocaleTimeString();
    console.log(`[STATUS] Backend operando: ${dataHora}`);
}, 50000);