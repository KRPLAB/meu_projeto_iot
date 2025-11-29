import { alertas } from '@prisma/client';

export namespace GetAlertaById {
  export type Args = { sensorId: number, alertaId: number };
  export type Return = alertas | null;
}

export namespace DeleteAlerta {
  export type Args = { sensorId: number, alertaId: number };
  export type Return = void;
}

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
