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
router.get('/dispositivos/:dispositivoUuid', DispositivoController.obterPorId);
router.put('/dispositivos/:dispositivoUuid', validate(dispositivoUpdate), DispositivoController.atualizar);
router.delete('/dispositivos/:dispositivoUuid', DispositivoController.remover);

// Sensores
import * as SensorController from '@/controllers/sensor';
import { create as sensorCreate, update as sensorUpdate } from '@/middleware/validation/sensor';
router.post('/dispositivos/:dispositivoUuid/sensores', validate(sensorCreate), SensorController.criar);
router.get('/dispositivos/:dispositivoUuid/sensores', SensorController.listar);
router.get('/dispositivos/:dispositivoUuid/sensores/:sensorId', SensorController.obterPorId);
router.put('/dispositivos/:dispositivoUuid/sensores/:sensorId', validate(sensorUpdate), SensorController.atualizar);
router.delete('/dispositivos/:dispositivoUuid/sensores/:sensorId', SensorController.remover);

// Leituras
router.post('/dispositivos/:dispositivoUuid/sensores/:sensorId/leituras', validate(leituraCreate), LeituraController.criar);
router.get('/dispositivos/:dispositivoUuid/sensores/:sensorId/leituras', LeituraController.listar);
router.get('/dispositivos/:dispositivoUuid/sensores/:sensorId/leituras/:leituraId', LeituraController.obterPorId);
router.delete('/dispositivos/:dispositivoUuid/sensores/:sensorId/leituras/:leituraId', LeituraController.remover);

// Alertas
router.post('/dispositivos/:dispositivoUuid/sensores/:sensorId/alertas', validate(alertaCreate), AlertaController.criar);
router.get('/dispositivos/:dispositivoUuid/sensores/:sensorId/alertas', AlertaController.listar);
router.get('/dispositivos/:dispositivoUuid/sensores/:sensorId/alertas/:alertaId', AlertaController.obterPorId);
router.delete('/dispositivos/:dispositivoUuid/sensores/:sensorId/alertas/:alertaId', AlertaController.remover);

export { router };