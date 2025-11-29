import 'module-alias/register';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import { connectMQTT } from "./mqtt/client";
import { router } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(router);

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

console.log("Hello World!");
console.log("🚀 Iniciando Sistema IoT...");

// Conectar ao broker MQTT
const mqttClient = connectMQTT();

// 2. Inicia Express
app.listen(PORT, () => {
  console.log(`🌐 API HTTP rodando na porta ${PORT}`);
});