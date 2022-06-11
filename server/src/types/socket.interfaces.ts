type typing = {
  user: string;
  messageLength: number;
};

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  type: (user: typing) => void;
  untype: (user: typing) => void;
  'chat message': (message: string) => void;
}

interface ClientToServerEvents {
  type: (user: typing) => void;
  untype: (user: typing) => void;
  'chat message': (message: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
