import type { ExpressValidations } from '../interfaces';
import { check } from 'express-validator';
import { validateFields } from '../utils/handleValidator';

const requiredMsg = 'the field is required';

const fromNotEmpty = check('from').optional().isMongoId();
const fromRequired = check('from').exists().withMessage(requiredMsg);
const limit = check('limit').optional().isNumeric();
const toNotEmpty = check('to').optional().isMongoId();
const toRequired = check('to').exists().withMessage(requiredMsg);

const lastMessagesValidator: ExpressValidations = [
  fromNotEmpty,
  fromRequired,
  limit,
  toNotEmpty,
  toRequired,
  validateFields,
];

export { lastMessagesValidator };
