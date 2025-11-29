import { z } from 'zod';

export const getAll = z.object({});

export const getById = z.object({
  sensorId: z.string().regex(/^\d+$/),
  leituraId: z.string().regex(/^\d+$/),
});

export const create = z.object({
  valor: z.number(),
});

export const update = z.object({
  valor: z.number().optional(),
});

export const remove = z.object({
  sensorId: z.string().regex(/^\d+$/),
  leituraId: z.string().regex(/^\d+$/),
});