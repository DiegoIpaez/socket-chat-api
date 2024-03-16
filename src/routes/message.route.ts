import { Router, type IRouter } from 'express';
import { lastMessagesValidator } from '../middlewares/message.middleware';
import { getLatestMessagesByChat } from '../controllers/message.controller';

const router: IRouter = Router();

router.get('/last-chat', lastMessagesValidator, getLatestMessagesByChat);

export default router;
