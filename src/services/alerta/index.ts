import { prisma } from '@/config/database';
import { CreateAlerta, GetAlertas } from './types';

export const criarAlerta = async (sensorId: number, nivel: 'baixo' | 'medio' | 'alto', mensagem: string) => {
    return prisma.alertas.create({
        data: {
            sensor_id: sensorId,
            nivel,
            mensagem,
        }
    });
};

export const listarAlertasPorSensor = async (sensorId: number) => {
    return prisma.alertas.findMany({
        where: {
            sensor_id: sensorId
        },
        orderBy: {
            data_hora: 'desc'
        }
    });
};

export const obterAlertaPorId = async (sensorId: number, alertaId: number) => {
    return prisma.alertas.findFirst({
        where: { 
            id: alertaId,
            sensor_id: sensorId 
        }
    });
};

export const removerAlerta = async (sensorId: number, alertaId: number) => {
    await prisma.alertas.deleteMany({
        where: {
            id: alertaId, 
            sensor_id: sensorId 
        }
    });
};
