import { type RequestHandler } from 'express';
import Message from '../model/Message';
import { MONGO_SORT_ORDER } from '../constants';

const DEFAULT_LIMIT = 30;

const getLatestMessagesByChat: RequestHandler = async (req, res, next) => {
  try {
    const { from, to, limit = DEFAULT_LIMIT } = req.query;
    const limitData = Number(limit);
    const filters = {
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    };
    const lastMessages = await Message.find(filters)
      .limit(limitData)
      .sort([['createdAt', MONGO_SORT_ORDER.DESC]])
      .lean();

    const messageSortedAsc = lastMessages.reverse();
    return res.status(200).json({ data: { messages: messageSortedAsc } });
  } catch (error) {
    next(error);
  }
};

export { getLatestMessagesByChat };
