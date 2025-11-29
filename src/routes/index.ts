import { Router, Request, Response } from 'express';
import * as LeituraController from '@/controllers/leitura';
import * as AlertaController from '@/controllers/alerta';
import { validate } from '@/middleware/validation/handler';
import { create as leituraCreate, getAll as leituraGetAll } from '@/middleware/validation/leitura';
import { create as alertaCreate, getAll as alertaGetAll } from '@/middleware/validation/alerta';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ status: '==== API Online!!!! ====' });
});


// --- Rotas REST aninhadas ---
// Leituras
router.post('/dispositivos/:dispositivoId/sensores/:sensorId/leituras', validate(leituraCreate), LeituraController.criar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/leituras', LeituraController.listar);

// Alertas
router.post('/dispositivos/:dispositivoId/sensores/:sensorId/alertas', validate(alertaCreate), AlertaController.criar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/alertas', AlertaController.listar);

export { router };