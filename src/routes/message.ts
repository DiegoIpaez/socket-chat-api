import { Router, type IRouter } from 'express';
import { lastMessagesValidator } from '../middlewares/messageMiddleware';
import { getLatestMessagesByChat } from '../controllers/messageController';

const router: IRouter = Router();

router.get('/last-chat', lastMessagesValidator, getLatestMessagesByChat);

export default router;
