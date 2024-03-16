import { type ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

import config from '../config';
import logger from '../utils/logger';

interface ResponseError {
  message: string;
  statusCode: number;
  stack?: string;
}

const errorApiHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  if (!message) {
    message = httpStatus[statusCode];
  }

  const error: ResponseError = {
    message,
    statusCode,
  };

  if (err?.stack && config.NODE_ENV === config.NODE_ENVS.DEV) {
    error.stack = err?.stack;
    logger.error(err?.stack);
  }

  return res.status(statusCode).send({ error });
};

export default errorApiHandler;
