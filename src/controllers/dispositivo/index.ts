import { Request, Response } from 'express';
import { criarDispositivo, listarDispositivos, obterDispositivoPorId, atualizarDispositivo, removerDispositivo } from '@/services/dispositivo';
import { DispositivoCreateInput, DispositivoUpdateInput } from './types';

export const criar = async (req: Request, res: Response) => {
  try {
    const input: DispositivoCreateInput = req.body;
    const dispositivo = await criarDispositivo(input);
    res.status(201).json(dispositivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listar = async (_req: Request, res: Response) => {
  try {
    const dispositivos = await listarDispositivos();
    res.json(dispositivos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const obterPorId = async (req: Request, res: Response) => {
  try {
    const dispositivo = await obterDispositivoPorId(Number(req.params.dispositivoId));
    if (!dispositivo) return res.status(404).json({ error: 'Dispositivo não encontrado' });
    res.json(dispositivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const input: DispositivoUpdateInput = req.body;
    const dispositivo = await atualizarDispositivo(Number(req.params.dispositivoId), input);
    res.json(dispositivo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    await removerDispositivo(Number(req.params.dispositivoId));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
