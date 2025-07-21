const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Only letters are allowed in the name']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;