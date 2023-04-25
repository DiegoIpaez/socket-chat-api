import { Router, type IRouter } from 'express';
import { getLatestMessagesByChat } from '../controllers/messageController';

const router: IRouter = Router();

router.get('/last-chat', getLatestMessagesByChat);

export default router;
