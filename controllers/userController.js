const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel');

exports.addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, email, password, tasks } = req.body;

    try {
        const newUser = await User.create({ name, email, password, tasks })
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create user' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'Users fetched', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error})
    }
}