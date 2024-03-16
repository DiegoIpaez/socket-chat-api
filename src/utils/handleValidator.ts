import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const validateFields: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};
