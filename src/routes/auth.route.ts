import { Router, type IRouter } from 'express';
import { login, register } from '../controllers/auth.controller';
import {
  validatorRegister,
  validatorLogin,
} from '../middlewares/authMiddleware';

const router: IRouter = Router();

router.post('/login', validatorLogin, login);
router.post('/register', validatorRegister, register);

export default router;
