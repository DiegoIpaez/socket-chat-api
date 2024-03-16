import type { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { encryptPassword, comparePasswords } from '../services/auth.service';
import { generateToken } from '../utils/handleJWT';
import ApiError from '../utils/ApiError';
import User from '../model/user.model';
import { ERROR_MESSAGES } from '../constants';

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        ERROR_MESSAGES.USER[httpStatus.NOT_FOUND],
      );
    }

    const isValidPassword = await comparePasswords(
      password,
      user?.password.valueOf(),
    );

    if (!isValidPassword) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        ERROR_MESSAGES.USER[httpStatus.UNAUTHORIZED],
      );
    }

    const token = generateToken(user?._id);
    const responseData = { user, token };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ApiError(
        httpStatus.CONFLICT,
        ERROR_MESSAGES.USER[httpStatus.CONFLICT],
      );
    }

    const passwordHash = await encryptPassword(password);
    const newUser = await User.create({
      email,
      username,
      password: passwordHash,
    });
    const token = generateToken(newUser?._id);
    const responseData = { user: newUser, token };
    return res.status(201).json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

export { login, register };
