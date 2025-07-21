const { body } = require('express-validator');
const User = require('../models/UserModel');

const userValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('The name field must not be empty')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage('Name only must have letters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('The field email must not have empty')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            const emailBd = await User.findOne({ email });
            if (emailBd) {
                throw new Error('A user already exists with this e-mail address');
            }
            return true;
        }),
    body('tasks.*')
        .isString().withMessage('Each task must be a string')
        .notEmpty().withMessage('Task cannot be empty')
];

module.exports = { userValidationRules };
