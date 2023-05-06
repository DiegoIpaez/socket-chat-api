import { MONGO_SORT_ORDER } from '../utils/constants';
import { getAllUsersByFilters } from './userService';
import User from '../model/User';
import Message from '../model/Message';

const getChatUsers = async () => {
  try {
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
    return {
      data: { ...chatUsers },
    };
  } catch (error) {
    throw new Error();
  }
};

const savePersonalMessage = async (payload: {
  from: string;
  to: string;
  message: string;
}) => {
  try {
    const message = await Message.create(payload);
    return {
      data: { message },
    };
  } catch (error) {
    throw new Error();
  }
};

const connectOrDisconnectUser = async (uid: string, isConnected: boolean) => {
  try {
    const user = await User.findById(uid);
    if (!user) return;
    user.online = isConnected;
    await user.save();
    return { data: { user } };
  } catch (error) {
    throw new Error();
  }
};

export { getChatUsers, savePersonalMessage, connectOrDisconnectUser };
