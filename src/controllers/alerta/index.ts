import { criarAlerta, listarAlertasPorSensor, obterAlertaPorId, removerAlerta } from '@/services/alerta';
import { Request, Response } from 'express';
import { AlertaCreateInput } from './types';
export const criar = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const { nivel, mensagem, leituraId } = req.body as AlertaCreateInput;
    const alerta = await criarAlerta(sensorId, nivel, mensagem, leituraId);
    res.status(201).json(alerta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const alertas = await listarAlertasPorSensor(sensorId);
    res.json(alertas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const obterPorId = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const alertaId = Number(req.params.alertaId);
    const alerta = await obterAlertaPorId(sensorId, alertaId);
    if (!alerta) return res.status(404).json({ error: 'Alerta não encontrado' });
    res.json(alerta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const alertaId = Number(req.params.alertaId);
    await removerAlerta(sensorId, alertaId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
