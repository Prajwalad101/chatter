import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    socket.on(EVENTS['chat message'], (message) => {
      setMessages([message, ...messages]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit(EVENTS['chat message'], messageInput);
    setMessageInput('');
  };

  return (
    <div className="mx-auto items-center flex justify-center  h-[100vh]">
      <div>
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
      <div>
        <input
          className="border-2 p-2 rounded-md"
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
        />
        <button
          onClick={sendMessage}
          className="px-7 py-2 rounded-md ml-4 bg-blue-600 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
