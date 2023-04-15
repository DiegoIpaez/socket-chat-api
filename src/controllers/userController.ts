import type { Request, Response } from 'express';
import {
  handleHttpError,
  handleCustomHttpError,
} from '../utils/handleHttpError';
import User from '../model/User';

const USER_NOT_FOUND = {
  code: 404,
  message: 'User not found',
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const { limit = 5, init = 0 } = req.query;

    const [total, users] = await Promise.all([
      User.countDocuments({ deleted: false }),
      User.find({ deleted: false }).skip(Number(init)).limit(Number(limit)),
    ]);
    const responseData = { total, users };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      const { code, message } = USER_NOT_FOUND;
      return handleCustomHttpError(res, message, code);
    }
    return res.status(200).json({ data: { user } });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const filter = { _id: id, deleted: false };
    const update = { deleted: true };
    const options = { new: true };

    const userDeleted = await User.findOneAndUpdate(filter, update, options);

    if (!userDeleted) {
      const { code, message } = USER_NOT_FOUND;
      return handleCustomHttpError(res, message, code);
    }

    const responseData = {
      msg: `User with id ${id} was removed`,
      userDeleted,
    };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    handleHttpError(res, error);
  }
};

export { getUsers, getUserById, deleteUser };
