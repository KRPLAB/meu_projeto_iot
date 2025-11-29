import { z } from 'zod';
import * as schemas from '@/middleware/validation/leitura';

export type LeituraCreateInput = z.infer<typeof schemas.create>;
export type LeituraUpdateInput = z.infer<typeof schemas.update>;
export type LeituraGetAllInput = z.infer<typeof schemas.getAll>;
export type LeituraGetByIdInput = z.infer<typeof schemas.getById>;
export type LeituraDeleteInput = z.infer<typeof schemas.remove>;