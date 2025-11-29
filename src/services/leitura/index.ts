import { prisma } from '@/config/database';

export const registrarLeitura = async (sensorId: number, valor: number) => {
  return prisma.leituras.create({
    data: {
      sensor_id: sensorId,
      valor
    }
  });
};

export const listarLeiturasPorSensor = async (sensorId: number) => {
  return prisma.leituras.findMany({
    where: {
      sensor_id: sensorId
    },
    orderBy: {
      data_hora: 'desc'
    }
  });
};

export const obterLeituraPorId = async (sensorId: number, leituraId: number) => {
  return prisma.leituras.findFirst({
    where: {
      id: leituraId,
      sensor_id: sensorId
    }
  });
};

export const removerLeitura = async (sensorId: number, leituraId: number) => {
  await prisma.leituras.deleteMany({
    where: {
      id: leituraId,
      sensor_id: sensorId
    }
  });
};