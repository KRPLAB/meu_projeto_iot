import { dispositivos } from '@prisma/client';

export namespace CreateDispositivo {
  export type Args = {
    mac_address: string;
    descricao?: string;
    status?: 'online' | 'offline';
  }
  export type Return = dispositivos;
}

export namespace UpdateDispositivo {
  export type Args = Partial<CreateDispositivo.Args>;
  export type Return = dispositivos;
}

export namespace GetDispositivoById {
  export type Args = { dispositivoId: number };
  export type Return = dispositivos | null;
}

export namespace GetDispositivos {
  export type Return = dispositivos[];
}

export namespace DeleteDispositivo {
  export type Args = { dispositivoId: number };
  export type Return = void;
}
