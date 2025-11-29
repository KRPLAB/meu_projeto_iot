import { z } from 'zod';

export const create = z.object({
  nivel: z.enum(['baixo', 'medio', 'alto']),
  mensagem: z.string().min(1),
  leituraId: z.number().int().optional(),
});

export const getAll = z.object({});
