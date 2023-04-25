import type { Request, Response } from 'express';
import { handleHttpError } from '../utils/handleHttpError';
import Message from '../model/Message';

const getLatestMessagesByChat = async (req: Request, res: Response) => {
  try {
    const { fromId, toId, limit = 30 } = req.params;

    const limitData = Number(limit);
    const filters = {
      from: fromId,
      to: toId,
    };

    const messages = await Message.find(filters)
      .sort({ createdAt: 'desc' })
      .limit(limitData);

    return res.status(200).json({ data: { messages } });
  } catch (error) {
    handleHttpError(res, error);
  }
};

export { getLatestMessagesByChat };
