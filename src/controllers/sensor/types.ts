import { z } from 'zod';
import * as schemas from '@/middleware/validation/sensor';

export type SensorCreateInput = z.infer<typeof schemas.create>;
export type SensorUpdateInput = z.infer<typeof schemas.update>;
export type SensorGetAllInput = z.infer<typeof schemas.getAll>;
export type SensorGetByIdInput = z.infer<typeof schemas.getById>;
export type SensorDeleteInput = z.infer<typeof schemas.remove>;
