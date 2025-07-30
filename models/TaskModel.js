const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        min: 1,
    },
    priority: {
        type: String,
        enum: ['high', 'mid', 'low'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [200, 'Description cannot exceed 200 characters']
    }

}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;