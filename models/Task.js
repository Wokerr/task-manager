const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        min: 5,
    },
    priority: {
        type: String,
        enum: ['High', 'Mid', 'Low'],
        required: true
    },

}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;