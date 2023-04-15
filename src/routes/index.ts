import { Router, type IRouter } from 'express';
import { validJWT } from '../middlewares/authMiddleware';
import authRouter from './auth';
import userRouter from './user';

const router: IRouter = Router();

const basePaths = {
  auth: '/auth',
  user: '/user',
};

router.use(basePaths.auth, authRouter);
router.use(validJWT);
router.use(basePaths.user, userRouter);

export default router;
