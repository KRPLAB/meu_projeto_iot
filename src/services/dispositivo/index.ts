import { prisma } from '@/config/database';
import { CreateDispositivo, UpdateDispositivo, GetDispositivoById, GetDispositivos, DeleteDispositivo } from './types';

export const criarDispositivo = async (input: CreateDispositivo.Args): Promise<CreateDispositivo.Return> => {
  return prisma.dispositivos.create({ data: input });
};

export const listarDispositivos = async (): Promise<GetDispositivos.Return> => {
  return prisma.dispositivos.findMany();
};

export const obterDispositivoPorId = async (dispositivoUuid: string): Promise<GetDispositivoById.Return> => {
  return prisma.dispositivos.findUnique({ where: { uuid: dispositivoUuid } });
};

export const atualizarDispositivo = async (dispositivoUuid: string, input: UpdateDispositivo.Args): Promise<UpdateDispositivo.Return> => {
  return prisma.dispositivos.update({ where: { uuid: dispositivoUuid }, data: input });
};

export const removerDispositivo = async (dispositivoUuid: string): Promise<DeleteDispositivo.Return> => {
  await prisma.dispositivos.delete({ where: { uuid: dispositivoUuid } });
};
