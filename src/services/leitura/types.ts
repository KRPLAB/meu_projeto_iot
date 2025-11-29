import { leituras } from '@prisma/client';

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