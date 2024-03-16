import type { Server, Socket } from 'socket.io';
import { validToken } from '../utils/handleJWT';
import {
  getChatUsers,
  savePersonalMessage,
  connectOrDisconnectUser,
} from '../services/chatService';
import { USER_CONNECTION_STATUS } from '../constants';

type SocketFunction = (socket: Socket, io?: Server) => void;
type ISocketChatEndPoints = Record<string, SocketFunction>;

const socketChatEndPoints: ISocketChatEndPoints = {};

const validateToken = async (socket: Socket) => {
  const token = socket?.handshake?.query?.Autorization ?? '';
  const { _id: uid } = await validToken(String(token));
  return uid;
};

socketChatEndPoints.connectUser = (socket, io) => {
  socket.on('online', async () => {
    try {
      const uid = await validateToken(socket);
      if (!uid) return socket.disconnect();
      await connectOrDisconnectUser(uid, USER_CONNECTION_STATUS.CONNECT);
      await socket.join(String(uid));
      io?.emit('user-list', await getChatUsers());
    } catch (error) {
      socket?.emit('user-list', {
        data: {},
        error: error instanceof Error ? error?.message : '',
      });
    }
  });
};

socketChatEndPoints.sendPersonalMessage = (socket, io) => {
  socket.on('personal-message', async (messageBody) => {
    try {
      const uid = await validateToken(socket);
      if (!uid) return socket.disconnect();
      const newMsg = await savePersonalMessage(messageBody);
      io?.to(messageBody.from).emit('personal-message', newMsg);
      io?.to(messageBody.to).emit('personal-message', newMsg);
    } catch (error) {
      io?.to(messageBody.from).emit('personal-message', {
        data: {},
        error: error instanceof Error ? error?.message : '',
      });
    }
  });
};

socketChatEndPoints.disconnectUser = (socket, io) => {
  socket.on('offline', async (uid) => {
    try {
      await connectOrDisconnectUser(uid, USER_CONNECTION_STATUS.DISCONNECT);
      io?.emit('user-list', await getChatUsers());
      socket.disconnect();
    } catch (error) {
      socket?.emit('user-list', {
        data: {},
        error: error instanceof Error ? error?.message : '',
      });
      socket.disconnect();
    }
  });
};

export default socketChatEndPoints;
