import httpStatus from 'http-status';

export const ERROR_MESSAGES = {
  USER: {
    [httpStatus.UNAUTHORIZED]: 'Invalid password or email.',
    [httpStatus.NOT_FOUND]: 'User not found.',
    [httpStatus.CONFLICT]: 'This user already exists.',
  },
};
