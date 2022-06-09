import { Server } from 'socket.io';
import EVENTS from '../../utils/events';

function socket(io: Server) {
  // listens to connection event for incoming sockets
  io.on(EVENTS.connection, (socket) => {
    console.log('User connected: ' + socket.id);
  });
}

export default socket;
