import { Server } from 'socket.io';
import EVENTS from '../utils/events';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types/socket.interfaces';

const message = EVENTS['chat message'];

function socket(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  // listens to connection event for incoming sockets
  io.on(EVENTS.connection, (socket) => {
    socket.on(EVENTS['chat message'], (message) => {
      io.emit(EVENTS['chat message'], message);
    });
  });
}

export default socket;
