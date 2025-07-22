const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules } = require('../validations/userValidation');

router.post('/users', userValidationRules, userController.addUser);
router.get('/users', userValidationRules, userController.getAllUsers);
router.delete(`/users/:id`, userValidationRules, userController.deleteUser);


module.exports = router;