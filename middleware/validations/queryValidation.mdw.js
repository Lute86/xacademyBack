const { checkValidationResult, validateEmail } = require('./validation.middleware');
const { validateDescription } = require('./courseValidation.mdw');
const { check } = require('express-validator');

const validateName = check('name')
.trim()
.notEmpty().withMessage('Name required')

const validateReason = check('reason')
.trim()
.notEmpty().withMessage('Reason required')
.isIn(['payment', 'enrollment', 'course', 'other']).withMessage('Invalid reason (payment, enrollment, course or other)')

const validateQuery = [
  validateName,
  validateEmail,
  validateReason,
  validateDescription,
  checkValidationResult
]

module.exports = {validateName, validateQuery}

