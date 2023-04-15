import { check, type ValidationChain } from 'express-validator';

interface ValidationRules {
  requiredMsg: string;
  minLength: number;
  maxLength: number;
}

/**
 * A basic validation is generated,
 * making the field required and with a limit of its characters.
 * @param field - Fieldname to validate.
 * @param validationRules - Rules to follow, all properties are mandatory.
 * @returns Validation.
 */
export const makeBasicValidation = (
  field: string,
  { maxLength, minLength, requiredMsg }: ValidationRules,
): ValidationChain => {
  return check(field)
    .exists()
    .notEmpty()
    .withMessage(requiredMsg)
    .isLength({ min: minLength, max: maxLength })
    .withMessage(
      `characters cannot be greater than ${maxLength} and less than ${minLength}`,
    );
};
