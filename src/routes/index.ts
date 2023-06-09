import { Router, type IRouter } from 'express';
import { validJWT } from '../middlewares/authMiddleware';
import authRouter from './auth';
import userRouter from './user';
import messageRouter from './message';

const router: IRouter = Router();

const basePaths = {
  auth: '/auth',
  user: '/user',
  message: '/message',
};

router.use(basePaths.auth, authRouter);
router.use(validJWT);
router.use(basePaths.message, messageRouter);
router.use(basePaths.user, userRouter);

export default router;
