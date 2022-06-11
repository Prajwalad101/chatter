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
    // when a user sends a message
    socket.on(EVENTS['chat message'], (message) => {
      io.emit(EVENTS['chat message'], message);
    });

    // when a user types a message
    socket.on('type', (username) => {
      socket.broadcast.emit('type', username);
    });

    // when a user untypes a message
    socket.on('untype', (username) => {
      socket.broadcast.emit('untype', username);
    });
  });
}

export default socket;
