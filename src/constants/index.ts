export * from './errorMessagesConstant';

export const MONGO_SORT_ORDER = {
  ASC: 1 as const,
  DESC: -1 as const,
};

export const USER_CONNECTION_STATUS = {
  CONNECT: true,
  DISCONNECT: false,
};
