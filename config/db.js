const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task_manager_db_test');
        console.log('MongoDB connected')
    } catch (error) {
        console.error("MongoDB connection error", error.message);
        if (process.env.NODE_ENV !== 'test') process.exit(1);
    }
};

module.exports = connectDB;