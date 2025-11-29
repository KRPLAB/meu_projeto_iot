import { z } from 'zod';

export const create = z.object({
  mac_address: z.string().min(1),
  descricao: z.string().min(1).optional(),
  status: z.enum(['online', 'offline']).optional(),
});

export const update = z.object({
  mac_address: z.string().min(1).optional(),
  descricao: z.string().min(1).optional(),
  status: z.enum(['online', 'offline']).optional(),
});

export const getAll = z.object({});

export const getById = z.object({
  dispositivoId: z.string().regex(/^\d+$/),
});

export const remove = z.object({
  dispositivoId: z.string().regex(/^\d+$/),
});
