import { type Options } from 'morgan';
import { type Request, type Response } from 'express';

import pino from 'pino';
import config from '../config';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: config.PINO_LOG_LEVEL,
});

export const streamSettings: Options<Request, Response> = {
  stream: {
    write: (req) => {
      logger.info(req.trim());
    },
  },
};

export default logger;
