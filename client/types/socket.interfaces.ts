/* eslint-disable no-unused-vars */

type typing = {
  user: string;
  messageLength: number;
};

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  type: (user: typing) => void;
  untype: (user: typing) => void;
  'chat message': (message: string) => void;
}

export interface ClientToServerEvents {
  type: (user: typing) => void;
  untype: (user: typing) => void;
  'chat message': (message: string) => void;
}
