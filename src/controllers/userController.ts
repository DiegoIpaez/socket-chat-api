import type { RequestHandler } from 'express';
import httpStatus from 'http-status';
import User from '../model/User';
import { getAllUsersByFilters } from '../services/userService';
import ApiError from '../utils/ApiError';
import { ERROR_MESSAGES } from '../constants';

const getUsers: RequestHandler = async (req, res, next) => {
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
    next(error);
  }
};

const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        ERROR_MESSAGES.USER[httpStatus.NOT_FOUND],
      );
    }

    return res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: id, deleted: false };
    const update = { deleted: true };
    const options = { new: true };

    const userDeleted = await User.findOneAndUpdate(filter, update, options);

    if (!userDeleted) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        ERROR_MESSAGES.USER[httpStatus.NOT_FOUND],
      );
    }

    const responseData = {
      msg: `User with id ${id} was removed`,
      userDeleted,
    };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUserById, deleteUser };
