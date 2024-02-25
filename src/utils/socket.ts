import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';

import allRoutes from '../routes/all';
import { serverErrorHandler } from '../middleware/error';

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: '*', // Allow any specified HTTP methods
  allowedHeaders: '*' // Allow any specified headers
}));
app.use(helmet());

// routes
app.use('/api/v1', allRoutes);

// error handlers
app.use(serverErrorHandler);

// an object will store data as: { <online userId>: socketId }
const onlineUsers: { [userId: string]: string } = {}

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
}});

io.on('connection', (socket: Socket) => {
  let userId = socket.handshake.query.userId as string;
  onlineUsers[userId] = socket.id;
  console.log("user connected, ", userId, socket.id);

  socket.on('disconnect', () => {
    delete onlineUsers.userId;
    console.log("user disconnected: ", socket.id);
  })
});


/**
 * returns current socketId by actual userId among online users
 * 
 * @param userId actual user ID
 * @returns current socket connection ID
 */
export const getUserSocketId = (userId: string) => {
  return onlineUsers[userId];
};