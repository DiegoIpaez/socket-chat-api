import httpStatus from 'http-status';

class ApiError extends Error {
  public readonly stack?: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode?: number,
    message?: string,
    isOperational?: boolean,
    stack = '',
  ) {
    super(message);

    this.statusCode = statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational ?? true;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this);
  }
}

export default ApiError;
