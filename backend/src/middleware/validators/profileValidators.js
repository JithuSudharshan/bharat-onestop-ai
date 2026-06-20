const { body } = require('express-validator');

const VALID_LANGUAGES = ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur'];
const VALID_EDUCATION = [
  'no_formal_education', 'primary', 'secondary', 'higher_secondary',
  'diploma', 'graduate', 'post_graduate', 'doctorate', 'other',
];
const VALID_RELATIONS = ['spouse', 'child', 'parent', 'sibling', 'other'];

// Shared reusable field validators
const nameValidator = body('name')
  .notEmpty().withMessage('Name is required')
  .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
  .trim();

const ageValidator = body('age')
  .notEmpty().withMessage('Age is required')
  .isInt({ min: 0, max: 120 }).withMessage('Age must be a number between 0 and 120');

const stateValidator = body('state')
  .notEmpty().withMessage('State is required')
  .trim();

const districtValidator = body('district')
  .notEmpty().withMessage('District is required')
  .trim();

const occupationValidator = body('occupation')
  .optional()
  .isLength({ max: 100 }).withMessage('Occupation cannot exceed 100 characters')
  .trim();

const educationValidator = body('education')
  .optional()
  .isIn(VALID_EDUCATION)
  .withMessage(`Education must be one of: ${VALID_EDUCATION.join(', ')}`);

const incomeValidator = body('income.annualIncome')
  .optional()
  .isFloat({ min: 0 }).withMessage('Annual income must be a non-negative number');

const familyTotalValidator = body('familyDetails.totalMembers')
  .optional()
  .isInt({ min: 1 }).withMessage('Total family members must be at least 1');

const familyMembersValidator = body('familyDetails.members')
  .optional()
  .isArray().withMessage('Family members must be an array');

const familyMemberRelationValidator = body('familyDetails.members.*.relation')
  .optional()
  .isIn(VALID_RELATIONS)
  .withMessage(`Relation must be one of: ${VALID_RELATIONS.join(', ')}`);

const familyMemberAgeValidator = body('familyDetails.members.*.age')
  .optional()
  .isInt({ min: 0, max: 120 }).withMessage('Family member age must be between 0 and 120');

const languageValidator = body('preferredLanguage')
  .optional()
  .isIn(VALID_LANGUAGES)
  .withMessage(`Preferred language must be one of: ${VALID_LANGUAGES.join(', ')}`);

const requirementsValidator = body('requirements')
  .optional()
  .isArray().withMessage('Requirements must be an array of strings')
  .custom((arr) => arr.every((r) => typeof r === 'string'))
  .withMessage('Each requirement must be a string');

// POST /profile — all required fields must be present
const createProfileValidator = [
  nameValidator,
  ageValidator,
  stateValidator,
  districtValidator,
  occupationValidator,
  educationValidator,
  incomeValidator,
  familyTotalValidator,
  familyMembersValidator,
  familyMemberRelationValidator,
  familyMemberAgeValidator,
  languageValidator,
  requirementsValidator,
];

// PUT /profile — all fields are optional (partial update)
const updateProfileValidator = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .trim(),
  body('age')
    .optional()
    .isInt({ min: 0, max: 120 }).withMessage('Age must be a number between 0 and 120'),
  body('state').optional().trim(),
  body('district').optional().trim(),
  occupationValidator,
  educationValidator,
  incomeValidator,
  familyTotalValidator,
  familyMembersValidator,
  familyMemberRelationValidator,
  familyMemberAgeValidator,
  languageValidator,
  requirementsValidator,
];

module.exports = {
  createProfileValidator,
  updateProfileValidator,
};
