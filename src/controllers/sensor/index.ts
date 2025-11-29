import { Request, Response } from 'express';
import { criarSensor, listarSensores, obterSensorPorId, atualizarSensor, removerSensor } from '@/services/sensor';
import { SensorCreateInput, SensorUpdateInput } from './types';

export const criar = async (req: Request, res: Response) => {
  try {
    const input: SensorCreateInput = req.body;
    const sensor = await criarSensor(input);
    res.status(201).json(sensor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listar = async (_req: Request, res: Response) => {
  try {
    const sensores = await listarSensores();
    res.json(sensores);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const obterPorId = async (req: Request, res: Response) => {
  try {
    const sensor = await obterSensorPorId(Number(req.params.sensorId));
    if (!sensor) return res.status(404).json({ error: 'Sensor não encontrado' });
    res.json(sensor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const input: SensorUpdateInput = req.body;
    const sensor = await atualizarSensor(Number(req.params.sensorId), input);
    res.json(sensor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    await removerSensor(Number(req.params.sensorId));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
