import type { Response, NextFunction } from 'express';
import type { RequestExt, ExpressValidations } from '../interfaces';
import { check } from 'express-validator';
import { validateFields } from '../utils/handleValidator';
import { handleCustomHttpError } from '../utils/handleHttpError';
import { makeBasicValidation } from '../utils/makeBasicValidation';
import { validToken, generateToken } from '../utils/handleJWT';

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
    const errMsg =
      err instanceof Error ? err?.message : 'Authentication failed!';
    handleCustomHttpError(res, errMsg, 401);
  }
};

export { validatorRegister, validatorLogin, validJWT };
