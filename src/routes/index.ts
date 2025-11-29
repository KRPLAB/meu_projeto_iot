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

// Dispositivos
// (Assumindo que existam os controllers e validações correspondentes)
import * as DispositivoController from '@/controllers/dispositivo';
import { create as dispositivoCreate, update as dispositivoUpdate } from '@/middleware/validation/dispositivo';
router.post('/dispositivos', validate(dispositivoCreate), DispositivoController.criar);
router.get('/dispositivos', DispositivoController.listar);
router.get('/dispositivos/:dispositivoId', DispositivoController.obterPorId);
router.put('/dispositivos/:dispositivoId', validate(dispositivoUpdate), DispositivoController.atualizar);
router.delete('/dispositivos/:dispositivoId', DispositivoController.remover);

// Sensores
import * as SensorController from '@/controllers/sensor';
import { create as sensorCreate, update as sensorUpdate } from '@/middleware/validation/sensor';
router.post('/dispositivos/:dispositivoId/sensores', validate(sensorCreate), SensorController.criar);
router.get('/dispositivos/:dispositivoId/sensores', SensorController.listar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId', SensorController.obterPorId);
router.put('/dispositivos/:dispositivoId/sensores/:sensorId', validate(sensorUpdate), SensorController.atualizar);
router.delete('/dispositivos/:dispositivoId/sensores/:sensorId', SensorController.remover);

// Leituras
router.post('/dispositivos/:dispositivoId/sensores/:sensorId/leituras', validate(leituraCreate), LeituraController.criar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/leituras', LeituraController.listar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/leituras/:leituraId', LeituraController.obterPorId);
router.delete('/dispositivos/:dispositivoId/sensores/:sensorId/leituras/:leituraId', LeituraController.remover);

// Alertas
router.post('/dispositivos/:dispositivoId/sensores/:sensorId/alertas', validate(alertaCreate), AlertaController.criar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/alertas', AlertaController.listar);
router.get('/dispositivos/:dispositivoId/sensores/:sensorId/alertas/:alertaId', AlertaController.obterPorId);
router.delete('/dispositivos/:dispositivoId/sensores/:sensorId/alertas/:alertaId', AlertaController.remover);

export { router };