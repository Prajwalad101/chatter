import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../config/default';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socket.interfaces';

type SocketProviderProps = { children: React.ReactNode };

// get the socket instance
const url = SERVER_URL;
const socket = io(url);

const SocketContext = createContext<
  Socket<ServerToClientEvents, ClientToServerEvents> | undefined
>(undefined);

function SocketProvider({ children }: SocketProviderProps) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  const socket = useContext(SocketContext);

  if (socket === undefined) {
    throw new Error('useSocket must be within a Socket Provider');
  }
  return socket;
}

export { SocketProvider, useSocket };
