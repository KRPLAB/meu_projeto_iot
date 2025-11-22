import { prisma } from '../../config/database';
import { CreateRegisterLeitura } from './types';

export const postLeitura = async (args: CreateRegisterLeitura.Args): Promise<CreateRegisterLeitura.Return> => {
  const { sensor_id, valor } = args;

  const nova_leitura = await prisma.leituras.create({
    data: {
      sensor_id,
      valor,
    },
  });

  return nova_leitura;
} 