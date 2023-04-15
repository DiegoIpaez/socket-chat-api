import type { Request, Response } from 'express';
import { encryptPassword, comparePasswords } from '../services/authService';
import { generateToken } from '../utils/handleJWT';
import {
  handleCustomHttpError,
  handleHttpError,
} from '../utils/handleHttpError';
import User from '../model/User';

const INVALID_USER = {
  code: 401,
  message: 'Invalid password or email.',
};
const USER_NOT_FOUND = {
  code: 404,
  message: 'User not found',
};
const USER_EXIST = {
  code: 409,
  message: 'This user already exists',
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return handleCustomHttpError(
        res,
        USER_NOT_FOUND.message,
        USER_NOT_FOUND.code,
      );
    }
    const isValidPassword = await comparePasswords(
      password,
      user?.password.valueOf(),
    );
    if (!isValidPassword) {
      return handleCustomHttpError(
        res,
        INVALID_USER.message,
        INVALID_USER.code,
      );
    }
    const token = generateToken(user?._id);
    const responseData = { user, token };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return handleCustomHttpError(res, USER_EXIST.message, USER_EXIST.code);
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
    handleHttpError(res, error);
  }
};

export { login, register };
