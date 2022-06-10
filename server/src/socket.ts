import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types/ServerType';

function socket(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  // listens to connection event for incoming sockets
  io.on('connection', (socket) => {
    console.log(`User connected: ` + socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

export default socket;
