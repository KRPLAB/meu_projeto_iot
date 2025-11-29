import { z } from 'zod';
import * as schemas from '@/middleware/validation/dispositivo';

export type DispositivoCreateInput = z.infer<typeof schemas.create>;
export type DispositivoUpdateInput = z.infer<typeof schemas.update>;
export type DispositivoGetAllInput = z.infer<typeof schemas.getAll>;
export type DispositivoGetByIdInput = z.infer<typeof schemas.getById>;
export type DispositivoDeleteInput = z.infer<typeof schemas.remove>;
