const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules, validateUserUpdate } = require('../validations/userValidation');

// User Routes

router.post('/users', userValidationRules, userController.createUser);
router.get('/users', userValidationRules, userController.getAllUsers);
router.delete(`/users/:id`, userValidationRules, userController.deleteUser);
router.put(`/users/:id`, validateUserUpdate, userController.updateUser);

// Task Routes



module.exports = router;