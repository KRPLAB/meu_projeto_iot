import { PrismaClient } from '../generated/client';

export const prisma = new PrismaClient({
  accelerateUrl: '',
  log: ['query', 'info', 'warn', 'error'],
});