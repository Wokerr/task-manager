require('dotenv').config(); 
const mongoose = require('mongoose');
const connectDB = require('../../config/db'); 
const Task = require('../../models/Task');
const User = require('../../models/User');

const run = async () => {
  try {
    await connectDB();

    // Crear una tarea de prueba
    const task = await Task.create({
      name: "Aprender mongoose",
      duration: 60,
      priority: "High",
    });

    // Crear un usuario de prueba con esa tarea
    const user = await User.create({
      name: "Juan Pérez",
      email: "juan@example.com",
      password: "123456",
      tasks: [task._id],
    });

    console.log("✅ Tarea creada:", task);
    console.log("✅ Usuario creado:", user);

    await mongoose.connection.close(); // Cierra conexión
  } catch (error) {
    console.error("❌ Error durante el test:", error.message);
  }
};

run();