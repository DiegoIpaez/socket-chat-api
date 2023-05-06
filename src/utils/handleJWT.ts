import type { JwtPayloadExt, IUser } from '../interfaces';
import config from '../config';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

const generateToken = (id: string): string => {
  const options = { expiresIn: '2h' };
  const token = jwt.sign({ id }, JWT_SECRET_KEY, options);
  return token;
};

const validToken = async (token?: string): Promise<IUser> => {
  if (!token) throw new Error('Authentication failed! Token required.');
  try {
    const jwtData: JwtPayloadExt | string = jwt.verify(token, JWT_SECRET_KEY);
    if (typeof jwtData !== 'string' && jwtData.id) {
      const user = await User.findById(jwtData.id);
      if (!user) throw new Error('Invalid user.');
      if (user.deleted) throw new Error('Invalid user.');
      return user;
    }
    throw new Error('Invalid user.');
  } catch (error) {
    throw new Error(
      `Authentication failed! Invalid token. Error: ${error as string}`,
    );
  }
};

export { generateToken, validToken };
