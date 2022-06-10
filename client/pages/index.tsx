import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../config/default';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/socket.interfaces';
import EVENTS from '../utils/events';

const url = SERVER_URL;
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url);

const Home: NextPage = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on(EVENTS['chat message'], (message) => {
      setMessages([...messages, message]);
    });
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(EVENTS['chat message'], messageInput);
    setMessageInput('');
  };

  return (
    <div className="h-[100vh] px-10">
      <div className="h-[80vh] overflow-y-auto">
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="w-[80%]">
        <form onSubmit={sendMessage} className="mb-10 flex justify-between">
          <input
            className="w-full rounded-sm border-2 p-2"
            type="text"
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
          />
          <button
            type="submit"
            className="ml-4 rounded-sm bg-blue-600 px-7 py-2 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
