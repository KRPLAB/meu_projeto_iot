import { prisma } from '@/config/database';
import { CreateAlerta, GetAlertaById, GetAlertas, DeleteAlerta } from './types';

export const criarAlerta = async (sensorId: number, nivel: 'baixo' | 'medio' | 'alto', mensagem: string): Promise<CreateAlerta.Return> => {
    return prisma.alertas.create({
        data: {
            sensor_id: sensorId,
            nivel,
            mensagem,
        }
    });
};

export const listarAlertasPorSensor = async (sensorId: number): Promise<GetAlertas.Return> => {
    return prisma.alertas.findMany({
        where: {
            sensor_id: sensorId
        },
        orderBy: {
            data_hora: 'desc'
        }
    });
};

export const obterAlertaPorId = async (sensorId: number, alertaId: number): Promise<GetAlertaById.Return> => {
    return prisma.alertas.findFirst({
        where: { 
            id: alertaId,
            sensor_id: sensorId 
        }
    });
};

export const removerAlerta = async (sensorId: number, alertaId: number): Promise<DeleteAlerta.Return> => {
    await prisma.alertas.deleteMany({
        where: {
            id: alertaId, 
            sensor_id: sensorId 
        }
    });
};
