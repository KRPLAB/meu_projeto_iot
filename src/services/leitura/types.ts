import { leituras } from '@prisma/client';

export namespace CreateLeitura {
  export type Args = { sensor_id: number; valor: number; }
  export type Return = leituras;
}

export namespace DeleteLeitura {
  export type Args = { sensorId: number, leituraId: number };
  export type Return = void;
}

export namespace CreateRegisterLeitura {
  export type Args = {
    sensor_id: number;
    valor: number;
  }

  export type Return = leituras;
}

export namespace GetLeituras {
  export type Return = leituras[];
}

export namespace GetLeituraById {
  export type Args = {
    id: number;
  }

  export type Return = leituras | null;
}