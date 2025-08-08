const { body, validationResult } = require('express-validator');
const Task = require('../models/TaskModel');
const User = require('../models/UserModel');

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

exports.assignTaskToUser = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        if (!userId || !taskId) {
            return res.status(400).json({message: "User ID and Task ID are required." /*, data: req.body */ })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(400).json({ message: "Task not Found" });
        }

        const alreadyAssigned = user.tasks.includes(taskId);

        if (alreadyAssigned) {
            return res.status(400).json({message: 'Task already assigned to this user'});
        }

        user.tasks.push(taskId);

        task.assignedTo = user._id;

        await user.save();
        await task.save();

        return res.status(200).json({ message: 'Task assigned successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}