/* eslint-disable no-unused-vars */

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  type: (user: string) => void;
  untype: (user: string) => void;
  'chat message': (message: string) => void;
}

export interface ClientToServerEvents {
  type: (user: string) => void;
  untype: (user: string) => void;
  'chat message': (message: string) => void;
}
