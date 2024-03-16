import { type RequestHandler } from 'express';
import { encryptPassword, comparePasswords } from '../services/authService';
import { generateToken } from '../utils/handleJWT';
import User from '../model/User';
import ApiError from '../utils/ApiError';

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

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(USER_NOT_FOUND.code, USER_NOT_FOUND.message);
    }

    const isValidPassword = await comparePasswords(
      password,
      user?.password.valueOf(),
    );

    if (!isValidPassword) {
      throw new ApiError(INVALID_USER.code, INVALID_USER.message);
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
      throw new ApiError(USER_EXIST.code, USER_EXIST.message);
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
