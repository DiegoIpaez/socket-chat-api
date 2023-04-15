import type { Response } from 'express';
import type { APIError } from '../interfaces';
import config from '../config';
import { getHttpStatusMessage } from '../utils/getHttpStatusMessage';

const NODE_ENV = config.NODE_ENV;

const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'Internal server error',
};

/**
 * Handles an internal server error by returning a response with
 * the provided error message and status code 500 (Internal Server Error).
 * @param res - Express response object.
 * @param error - Error object received.
 * @returns The Express response object with the error message and status code.
 */
export const handleHttpError = (
  res: Response,
  error: Error | unknown,
): Response => {
  const { message, code } = INTERNAL_SERVER_ERROR;
  const description = error instanceof Error ? error?.message : '';
  const errorData: APIError = { message, code, description };

  if (NODE_ENV === config.NODE_ENVS.DEV) console.log(error);
  return res.status(code).json({ error: errorData });
};

/**
 * Handles a custom HTTP error by returning an Express response object with
 * an error message and status code.
 * @param res - Express response object.
 * @param errorMsg - A description of the error that occurred.
 * @param statusCode - An HTTP error code to return in the response, optional.
 * @param errorRaw - An optional error object to log to the console in development mode.
 * @returns The Express response object with the error message and status code.
 */
export const handleCustomHttpError = (
  res: Response,
  errorMsg: string,
  statusCode: number = INTERNAL_SERVER_ERROR.code,
  errorRaw?: unknown,
): Response => {
  const message = getHttpStatusMessage(statusCode);
  const error: APIError = {
    message,
    code: statusCode,
    description: errorMsg,
  };

  if (errorRaw && NODE_ENV === config.NODE_ENVS.DEV) console.log(errorRaw);
  return res.status(statusCode).json({ error });
};
