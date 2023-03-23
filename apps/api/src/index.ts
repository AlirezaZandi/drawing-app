import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('mouse-move', (payload) => {
    socket.broadcast.emit('mouse-move', payload);
  });
});

httpServer.listen(8000);

export { httpServer as app };
