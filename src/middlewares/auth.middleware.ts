import type { Response, Request, NextFunction } from 'express';
import type { ExpressValidations, IUser } from '../interfaces';

import { check } from 'express-validator';
import { validateFields } from '../utils/handleValidator';
import { makeBasicValidation } from '../utils/makeBasicValidation';
import { validToken, generateToken } from '../utils/handleJWT';

interface RequestExt extends Request {
  user?: IUser | string;
}

const isEmail = check('email', 'Enter a valid email').isEmail();
const emailRequired = makeBasicValidation('email', {
  requiredMsg: 'Email is required',
  minLength: 1,
  maxLength: 255,
});
const passwordRequired = makeBasicValidation('password', {
  requiredMsg: 'Password is required',
  minLength: 6,
  maxLength: 255,
});
const usernameRequired = makeBasicValidation('username', {
  requiredMsg: 'Username is required',
  minLength: 3,
  maxLength: 255,
});

const validatorRegister: ExpressValidations = [
  usernameRequired,
  emailRequired,
  isEmail,
  passwordRequired,
  validateFields,
];

const validatorLogin: ExpressValidations = [
  emailRequired,
  isEmail,
  passwordRequired,
  validateFields,
];

const validJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const isValid = await validToken(token);
    req.user = isValid;
    res.header('Access-Control-Expose-Headers', 'Token-Refresh');
    res.header('Token-Refresh', generateToken(isValid?._id));
    next();
  } catch (err: Error | unknown) {
    return res.status(401).json({
      error: {
        message: err instanceof Error ? err?.message : 'Authentication failed!',
        statusCode: 401,
      },
    });
  }
};

export { validatorRegister, validatorLogin, validJWT };
