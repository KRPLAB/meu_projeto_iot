import { sensores } from '@prisma/client';

export namespace CreateSensor {
  export type Args = {
    tipo: string;
    localizacao: string;
    status?: 'ativo' | 'inativo';
    dispositivo_id?: number;
  }
  export type Return = sensores;
}

export namespace UpdateSensor {
  export type Args = Partial<CreateSensor.Args>;
  export type Return = sensores;
}

export namespace GetSensorById {
  export type Args = { sensorId: number };
  export type Return = sensores | null;
}

export namespace GetSensores {
  export type Return = sensores[];
}

export namespace DeleteSensor {
  export type Args = { sensorId: number };
  export type Return = void;
}
