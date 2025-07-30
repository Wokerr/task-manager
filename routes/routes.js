const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController= require('../controllers/taskController');
const { userValidationRules, validateUserUpdate } = require('../validations/userValidation');
const { taskValidationRules, validateUserUpdate } = require('../validations/taskValidation');

// User Routes

router.post('/users', userValidationRules, userController.createUser);
router.get('/users', userValidationRules, userController.getAllUsers);
router.delete(`/users/:id`, userValidationRules, userController.deleteUser);
router.put(`/users/:id`, validateUserUpdate, userController.updateUser);

// Task Routes

router.post('/tasks', taskValidationRules, taskController.createTask)



module.exports = router;