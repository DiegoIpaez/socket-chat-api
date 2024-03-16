import { MONGO_SORT_ORDER } from '../constants';
import { getAllUsersByFilters } from './user.service';
import User from '../model/user.model';
import Message from '../model/message.model';

const getChatUsers = async () => {
  const query = {
    init: 0,
    limit: 10,
    sort: {
      online: MONGO_SORT_ORDER.DESC,
      updatedAt: MONGO_SORT_ORDER.DESC,
    },
    deleted: false,
    select: '-createdAt -updatedAt',
  };
  const chatUsers = await getAllUsersByFilters(query);
  return { data: { ...chatUsers } };
};

const savePersonalMessage = async (payload: {
  from: string;
  to: string;
  message: string;
}) => {
  const message = await Message.create(payload);
  return { data: { message } };
};

const connectOrDisconnectUser = async (uid: string, isConnected: boolean) => {
  const user = await User.findById(uid);
  if (!user) return;
  user.online = isConnected;
  await user.save();
  return { data: { user } };
};

export { getChatUsers, savePersonalMessage, connectOrDisconnectUser };
