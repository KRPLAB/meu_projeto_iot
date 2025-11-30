import { Request, Response } from 'express';
import { registrarLeitura, listarLeiturasPorSensor, obterLeituraPorId, removerLeitura } from '@/services/leitura';
import { LeituraCreateInput } from './types';

export const listar = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const leituras = await listarLeiturasPorSensor(sensorId);
    res.json(leituras);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const obterPorId = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const leituraId = Number(req.params.leituraId);
    const leitura = await obterLeituraPorId(sensorId, leituraId);
    if (!leitura) return res.status(404).json({ error: 'Leitura não encontrada' });
    res.json(leitura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const input: LeituraCreateInput = req.body;
    const sensorId = Number(req.params.sensorId);
    const leitura = await registrarLeitura(sensorId, input.valor);
    res.status(201).json(leitura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const leituraId = Number(req.params.leituraId);
    await removerLeitura(sensorId, leituraId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};