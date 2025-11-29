import { z } from 'zod';

export const create = z.object({
  tipo: z.string().min(1),
  localizacao: z.string().min(1),
  status: z.enum(['ativo', 'inativo']).optional(),
  dispositivo_id: z.number().int().optional(),
});

export const update = z.object({
  tipo: z.string().min(1).optional(),
  localizacao: z.string().min(1).optional(),
  status: z.enum(['ativo', 'inativo']).optional(),
  dispositivo_id: z.number().int().optional(),
});

export const getAll = z.object({});

export const getById = z.object({
  sensorId: z.string().regex(/^\d+$/),
});

export const remove = z.object({
  sensorId: z.string().regex(/^\d+$/),
});
