import { Router, type IRouter } from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
} from '../controllers/user.controller';

const router: IRouter = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
