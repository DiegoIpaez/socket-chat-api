import type { Request, Response, NextFunction } from 'express';
import type { ValidateFields } from '../interfaces';
import { validationResult } from 'express-validator';

export const validateFields: ValidateFields = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};
