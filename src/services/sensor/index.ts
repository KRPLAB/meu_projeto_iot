import { prisma } from '@/config/database';
import { CreateSensor, UpdateSensor, GetSensorById, GetSensores, DeleteSensor } from './types';

export const criarSensor = async (input: CreateSensor.Args): Promise<CreateSensor.Return> => {
  return prisma.sensores.create({ data: input });
};

export const listarSensores = async (): Promise<GetSensores.Return> => {
  return prisma.sensores.findMany();
};

export const obterSensorPorId = async (sensorId: number): Promise<GetSensorById.Return> => {
  return prisma.sensores.findUnique({ where: { id: sensorId } });
};

export const atualizarSensor = async (sensorId: number, input: UpdateSensor.Args): Promise<UpdateSensor.Return> => {
  return prisma.sensores.update({ where: { id: sensorId }, data: input });
};

export const removerSensor = async (sensorId: number): Promise<DeleteSensor.Return> => {
  await prisma.sensores.delete({ where: { id: sensorId } });
};
