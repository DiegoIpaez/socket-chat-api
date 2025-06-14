import httpStatus from 'http-status';
import expressRateLimit from 'express-rate-limit';
import CONFIG from '../config';

const {
  RATE_LIMIT: { MAX_MINUTES, MAX_REQUESTS },
} = CONFIG;

const rateLimit = expressRateLimit({
  windowMs: MAX_MINUTES * 60 * 1000,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(httpStatus.TOO_MANY_REQUESTS).json({
      error: {
        message: `You have exceeded the maximum of ${MAX_REQUESTS} requests in ${MAX_MINUTES} minutes.`,
        statusCode: httpStatus.TOO_MANY_REQUESTS,
      },
    }),
});

export default rateLimit;
