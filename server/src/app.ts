import config from 'config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socket from './socket';

const port = config.get<number>('port');
const host = config.get<string>('port');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();

const httpServer = http.createServer(app);

// creates new instance of socket.io
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

socket(io);

httpServer.listen(port, host, () => {
  console.log(`The server is listening at port ${port}`);
});
