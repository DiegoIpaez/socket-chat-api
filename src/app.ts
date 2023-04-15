import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(json());
app.use(compression());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../src/public')));

io.on('connection', (socket) => {
  socket.emit('msg-welcome', { msg: 'Welcome to Server' });
});

app.use('/api', routes);

export default server;
