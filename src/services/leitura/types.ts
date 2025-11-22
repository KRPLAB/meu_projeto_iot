import { leituras } from '@prisma/client';

export namespace CreateRegisterLeitura {
  export type Args = {
    sensor_id: number;
    valor: number;
  }

  export type Return = leituras;
}