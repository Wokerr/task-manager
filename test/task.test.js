const mongoose = require('mongoose');
const Task = require('../models/TaskModel');
const User = require('../models/UserModel');
const app = require('../app');
const request = require('supertest');

require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

beforeEach(async () => {
  await Task.deleteMany();
  await User.deleteMany();
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
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit ut congue parturient.'
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

  // Assigned task test

  it('should convert priority to lowercase automatically', async () => {
  const task = new Task({
    name: 'Test Task',
    duration: 5,
    priority: 'HIGH',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit ut congue parturient.'
  });

  const savedTask = await task.save();
  expect(savedTask.priority).toBe('high');
  });

  it('should assign a task to a user', async () => {
    const user = await User.create({ name: 'Woker', email: 'woker@example.com', tasks: [] });
    const task = await Task.create({ name: 'Clean', duration: 5, priority: 'LOW', description: 'Before ending the week your house must be clean' });

    const res = await request(app)
      .post('/tasks/assign/')
      .send({ userId: user._id, taskId: task._id });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task assigned successfully');

    const updateUser = await User.findById(user._id);
    expect(updateUser.tasks).toContainEqual(task._id);
  });

  it('should not allow assigning the same task twice', async () => {

    const user = await User.create({ name: 'Woker', email: 'woker@example.com', tasks: [] });
    const task = await Task.create({ name: 'Clean', duration: 5, priority: 'LOW', description: 'Before ending the week your house must be clean' });
    
    await request(app).post('/tasks/assign/').send({ userId: user._id, taskId: task._id });
    const res = await request(app).post('/tasks/assign/').send({ userId: user._id, taskId: task._id });
    
    // console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Task already assigned to this user');
  });

  it('should return 400 if userId or TaskId is missing', async () => {
    const res = await request(app).post('/tasks/assign/').send({ userId: '123' });
    
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('User ID and Task ID are required.')
  })

  it('should return 400 if user does not exist', async () => {
    const task = await Task.create({ name: 'Clean', duration: 5, priority: 'LOW', description: 'Before ending the week your house must be clean' });

    const res = await request(app)
      .post('/tasks/assign/')
      .send({ userId: new mongoose.Types.ObjectId(), taskId: task._id });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User not Found');

  });
  
  it('should return 400 if task does not exist', async () => {

    const user = await User.create({ name: 'Woker', email: 'woker@example.com', tasks: [] });

    const res = await request(app)
      .post('/tasks/assign/')
      .send({ userId: user._id, taskId: new mongoose.Types.ObjectId() });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Task not Found');

  });

});
