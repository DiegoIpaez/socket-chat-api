import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { createServer } from 'http';
import compression from 'compression';
import express, { json, urlencoded, static as staticMiddleware } from 'express';

import routes from './routes';
import { streamSettings } from './utils/logger';
import rateLimit from './middlewares/rateLimit.middleware';
import errorApiHandler from './middlewares/error.middleware';
import socketChatController from './controllers/chat.controller';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(helmet());
app.use(rateLimit);

app.use(morgan('dev', streamSettings));

app.use(json());
app.use(urlencoded({ extended: true, limit: '50mb' }));

app.use(compression());

app.use(staticMiddleware(path.join(__dirname, '../src/public')));

io.on('connection', (socket) => {
  socketChatController.connectUser(socket, io);
  socketChatController.sendPersonalMessage(socket, io);
  socketChatController.disconnectUser(socket, io);
});

app.use('/api', routes);
app.use(errorApiHandler);

export default server;
