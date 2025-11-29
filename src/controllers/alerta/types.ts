import { z } from 'zod';
import * as schemas from '@/middleware/validation/alerta';

export type AlertaCreateInput = z.infer<typeof schemas.create>;
export type AlertaGetAllInput = z.infer<typeof schemas.getAll>;
