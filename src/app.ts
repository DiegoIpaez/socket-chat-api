import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import routes from './routes';
import { streamSettings } from './utils/logger';
import socketChatController from './controllers/chatController';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(json());
app.use(compression());
app.use(morgan('dev', streamSettings));
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../src/public')));

io.on('connection', (socket) => {
  socketChatController.connectUser(socket, io);
  socketChatController.sendPersonalMessage(socket, io);
  socketChatController.disconnectUser(socket, io);
});

app.use('/api', routes);

export default server;
