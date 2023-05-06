import type { Request, Response } from 'express';
import Message from '../model/Message';
import { handleHttpError } from '../utils/handleHttpError';
import { MONGO_SORT_ORDER } from '../utils/constants';

const DEFAULT_LIMIT = 30;

const getLatestMessagesByChat = async (req: Request, res: Response) => {
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
    handleHttpError(res, error);
  }
};

export { getLatestMessagesByChat };
