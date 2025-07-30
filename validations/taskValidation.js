const { body } = require('express-validator');
const Task = require('../models/TaskModel');

const taskValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Task must have a name')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage('Name only must have letters')
        .isLength({ min: 3, max: 15 }).withMessage('Name cannot have less than 3 or more than 15 letters')
        .custom(async (name) => {
            const taskBd = await Task.findOne({ name });
            if (taskBd) {
                throw new Error('There is another task with this name')
            }
            return true;
        }),
    
    body('duration')
        .notEmpty().withMessage('Duration is required')
        .isInt({ min: 1, max: 90 }).withMessage('Duration must be a number between 1 and 90 (days)'),
    
    body('priority')
        .notEmpty()
        .toLowerCase()
        .isIn(['high', 'mid', 'low']).withMessage('Priority must be one of: high, mid, low')  
]

module.exports = {
    taskValidationRules
};