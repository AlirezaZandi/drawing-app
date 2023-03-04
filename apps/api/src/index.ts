import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user conected');
});

httpServer.listen(8000);
