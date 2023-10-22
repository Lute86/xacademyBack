const { validateEmail } = require('./registrationValidation.mdw');
const { validateDescription } = require('./courseValidation.mdw');
const { check } = require('express-validator');
const { checkValidationResult } = require('./validation.middleware')


const validateName = check('name')
.trim()
.notEmpty().withMessage('Name required')

const validateReason = check('reason')
.trim()
.notEmpty().withMessage('Reason required')
.isIn(['payment', 'enrollment', 'course', 'other']).withMessage('Invalid reason (payment, enrollment, course or other)')

const validateAnswer = check('answered')
.notEmpty().withMessage('Answered required')
.isIn(['yes', 'no']).withMessage('Invalid answred (yes or no)')

const validateQuery = [
  validateName,
  validateEmail,
  validateReason,
  validateDescription,
  checkValidationResult
]

const validateUpdateQuery = [
  validateName.optional(),
  validateEmail.optional(),
  validateReason.optional(),
  validateDescription.optional(),
  validateAnswer.optional(),
  checkValidationResult
]

module.exports = {validateName, validateQuery, validateReason, validateUpdateQuery}

