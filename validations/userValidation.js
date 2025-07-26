const { body } = require('express-validator');
const User = require('../models/UserModel');

// Validation used to Create user

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

    // Validation used to Update User // Middlewares
    
function validateUserUpdate(req, res, next) {
    const { name, email } = req.body;

    if (!name && !email) {
        return res.status(400).json({ error: 'At least one field must be provided.' });
    }

    if (typeof name !== 'string' || name.trim() === '' || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
        delete req.body.name;
    }

    if (email !== undefined) {
        if (typeof email !== 'string' || email.trim() === '') {
            
            delete req.body.email;
        } else if (!email.includes('@') || !email.includes('.')) {
            
            return res.status(400).json({
                error: 'The email is an invalid or empty input because it wasn’t updated.',
                data: req.body
            });
        }
    }

    next();
}


module.exports = {
    userValidationRules,
    validateUserUpdate
};