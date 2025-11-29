import { prisma } from '@/config/database';
import { CreateLeitura, GetLeituraById, GetLeituras, DeleteLeitura } from './types';

export const registrarLeitura = async (sensorId: number, valor: number): Promise<CreateLeitura.Return> => {
  return prisma.leituras.create({
    data: {
      sensor_id: sensorId,
      valor
    }
  });
};

export const listarLeiturasPorSensor = async (sensorId: number): Promise<GetLeituras.Return> => {
  return prisma.leituras.findMany({
    where: {
      sensor_id: sensorId
    },
    orderBy: {
      data_hora: 'desc'
    }
  });
};

export const obterLeituraPorId = async (sensorId: number, leituraId: number): Promise<GetLeituraById.Return> => {
  return prisma.leituras.findFirst({
    where: {
      id: leituraId,
      sensor_id: sensorId
    }
  });
};

export const removerLeitura = async (sensorId: number, leituraId: number): Promise<DeleteLeitura.Return> => {
  await prisma.leituras.deleteMany({
    where: {
      id: leituraId,
      sensor_id: sensorId
    }
  });
};