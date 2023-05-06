import type { Request, Response } from 'express';
import {
  handleHttpError,
  handleCustomHttpError,
} from '../utils/handleHttpError';
import User from '../model/User';
import { getAllUsersByFilters } from '../services/userService';

const USER_NOT_FOUND = {
  code: 404,
  message: 'User not found',
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const { limit = 5, init = 0 } = req.query;

    const filters = {
      limit: Number(limit),
      init: Number(init),
      deleted: false,
    };

    const responseData = await getAllUsersByFilters(filters);
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
