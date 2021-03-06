import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../config/default';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socket.interfaces';
import EVENTS from '../utils/events';

type SocketProviderProps = { children: React.ReactNode };
type Context = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  messages: string[];
  setMessages: Function;
  typingUser: string;
  setTypingUser: Function;
  messageLength?: number;
};

// get the socket instance
const url = SERVER_URL;
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url);

const SocketContext = createContext<Context | undefined>(undefined);

function SocketProvider({ children }: SocketProviderProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState<string>('');
  const [messageLength, setMessageLength] = useState<number | undefined>();

  // receive messages
  useEffect(() => {
    socket.once(EVENTS['chat message'], (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // receive and event if the user types
  useEffect(() => {
    socket.on('type', ({ user: username, messageLength }) => {
      setTypingUser(username);
      setMessageLength(messageLength);
    });
  }, []);

  // also receive an event is user removes the typed message
  useEffect(() => {
    socket.on('untype', (_user) => {
      setTypingUser('');
    });
  });

  // set context value
  const value = {
    socket,
    messages,
    setMessages,
    messageLength,
    typingUser,
    setTypingUser,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
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
