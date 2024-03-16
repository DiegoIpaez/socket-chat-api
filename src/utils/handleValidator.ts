import type { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { validationResult } from 'express-validator';

export const validateFields: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const statusCode = httpStatus.BAD_REQUEST;
    const error = {
      statusCode,
      message: httpStatus[statusCode],
    };

    return res.status(statusCode).json({ error, ...errors });
  }

  next();
};
