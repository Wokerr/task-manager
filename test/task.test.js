const mongoose = require('mongoose');
const Task = require('../models/TaskModel');
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

beforeEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Model', () => {
  it('should create a task successfully', async () => {
    const task = new Task({
      name: 'Test Task',
      duration: 5,
      priority: 'High',
    });
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.name).toBe('Test Task');
  });

  it('should fail without required fields', async () => {
    const task = new Task({}); // sin nada

    let error = null;
    try {
      await task.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });
});
