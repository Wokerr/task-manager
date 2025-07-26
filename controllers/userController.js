const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel');

    // Create new User

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, email, password, tasks } = req.body;

    try {
        const newUser = await User.create({ name, email, password, tasks });
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create user',
            data: error.message
        });
    }
};

    // Return all Users

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(200).json({
                message: 'Not users found',
                data: users
            });
        } return res.status(200).json({
            message: 'Users fetched',
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

    // Delete User by ID

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'server error',
            error
        });
    }

}

 // Update User information by ID

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    
    try {
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }    
}