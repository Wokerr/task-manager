const { body, validationResult } = require('express-validator');
const Task = require('../models/TaskModel');

// Create new Task

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, duration, priority, description } = req.body;

    try {
        const newTask = await Task.create({ name, duration, priority, description });
        return res.status(201).json({
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create task',
            data: error.message
        });
    }
}