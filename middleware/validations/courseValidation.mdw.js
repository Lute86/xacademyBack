const { checkValidationResult } = require('./validation.middleware');
const { check } = require('express-validator');

const validateCourseName = check('course_name')
  .trim()
  .notEmpty().withMessage('Course name is required');

const validateDescription = check('description')
  .trim()
  .notEmpty().withMessage('Description is required');

const validateModality = check('modality')
  .trim()
  .notEmpty().withMessage('Modality is required')
  .isIn(['in-person', 'hybrid', 'online']).withMessage('Invalid modality. (in-person, hybrid, online)');

const validateDuration = check('duration')
  .trim()
  .notEmpty().withMessage('Duration is required');

const validatePrice = check('price')
  .notEmpty().withMessage('Price is required')
  .isDecimal().withMessage('Price must be a decimal')
  .isFloat({ min: 0 }).withMessage('Price must be a positive value');

const validateActive = check('active')
  .isBoolean().withMessage('Active must be a boolean');

  const validateStartDate = check('start_date')
  .optional({ nullable: true, checkFalsy: true }) // Allow null or empty
  .isISO8601({ strict: false }) // Validate as ISO 8601 date, but without strict time requirements ("2023-09-30" or "2023-09-30T00:00:00Z")

const validateFinishDate = check('finish_date')
  .optional({ nullable: true, checkFalsy: true })
  .isISO8601({ strict: false }) 

const validateType = check('type')
  .trim()
  .notEmpty().withMessage('Type is required')
  .isIn(['course', 'career', 'training']).withMessage('Invalid type');

const validateCourse = [
  validateCourseName,
  validateDescription,
  validateModality,
  validateDuration,
  validatePrice,
  validateActive,
  validateStartDate,
  validateFinishDate,
  validateType,
  checkValidationResult
];
const validateCourseUpdate = [
  validateCourseName.optional(),
  validateDescription.optional(),
  validateModality.optional(),
  validateDuration.optional(),
  validatePrice.optional(),
  validateActive.optional(),
  validateStartDate.optional(),
  validateFinishDate.optional(),
  validateType.optional(),
  checkValidationResult
];

module.exports = {
  validateDescription,
  validateCourseUpdate,
  validateCourse,
};
