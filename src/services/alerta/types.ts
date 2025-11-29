import { alertas } from '@prisma/client';

export namespace CreateAlerta {
  export type Args = {
    dispositivoId: number;
    sensorId: number;
    leituraId?: number | null;
    nivel: 'baixo' | 'medio' | 'alto';
    mensagem: string;
  }

  export type Return = alertas;
}

export namespace GetAlertas {
  export type Return = alertas[];
}
