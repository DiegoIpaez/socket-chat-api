import { Router, type IRouter } from 'express';
import { validJWT } from '../middlewares/auth.middleware';
import authRouter from './auth.route';
import userRouter from './user.route';
import messageRouter from './message.route';

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
