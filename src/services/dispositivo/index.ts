import { prisma } from '@/config/database';
import { CreateDispositivo, UpdateDispositivo, GetDispositivoById, GetDispositivos, DeleteDispositivo } from './types';

export const criarDispositivo = async (input: CreateDispositivo.Args): Promise<CreateDispositivo.Return> => {
  return prisma.dispositivos.create({ data: input });
};

export const listarDispositivos = async (): Promise<GetDispositivos.Return> => {
  return prisma.dispositivos.findMany();
};

export const obterDispositivoPorId = async (dispositivoId: number): Promise<GetDispositivoById.Return> => {
  return prisma.dispositivos.findUnique({ where: { id: dispositivoId } });
};

export const atualizarDispositivo = async (dispositivoId: number, input: UpdateDispositivo.Args): Promise<UpdateDispositivo.Return> => {
  return prisma.dispositivos.update({ where: { id: dispositivoId }, data: input });
};

export const removerDispositivo = async (dispositivoId: number): Promise<DeleteDispositivo.Return> => {
  await prisma.dispositivos.delete({ where: { id: dispositivoId } });
};
