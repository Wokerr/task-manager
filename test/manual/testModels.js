require('dotenv').config(); 
const mongoose = require('mongoose');
const connectDB = require('../../config/db'); 
const Task = require('../../models/Task');
const User = require('../../models/User');

const run = async () => {
  try {
    await connectDB();

    // Create a test task
    const task = await Task.create({
      name: "Aprender mongoose",
      duration: 60,
      priority: "High",
    });

    // Create a user with that task
    const user = await User.create({
      name: "Juan Pérez",
      email: "juan@example.com",
      password: "123456",
      tasks: [task._id],
    });

    console.log("✅ Task created:", task);
    console.log("✅ User created:", user);

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error durante el test:", error.message);
  }
};

run();