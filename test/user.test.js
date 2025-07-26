const mongoose = require('mongoose');
const User = require('../models/UserModel');
const app = require('../app');
const request = require('supertest');
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

beforeEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    
    // Model Test
    
    it('Should create a user successfully', async () => {
        const user = new User({
            name: 'Emmanuel',
            email: 'emmanuel123@gmail.com',
            // password: '1234asd678',
            tasks:[]
        });
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('Emmanuel');
        expect(savedUser.email).toBe('emmanuel123@gmail.com');
        // expect(savedUser.password).toBeDefined();
    });

    it('Should fail if required field is missing', async () => {
        const user = new User({
            email: 'emmanuel123@gmail.com'
        });

        let error = null;

        try {
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.name).toBeDefined();
    });

    it('Should fail if fields have wrong data types', async () => {
        const user = new User({
            name: 123,
            email: ['emmanuel123@gmail.com'],
            password: 12345,
            tasks: []
        });

        let error = null;

        try {
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.name).toBeDefined();
        expect(error.errors.email).toBeDefined();
        // expect(error.errors.password).toBeDefined();
    });

    // Route Test - Post user

    it('Should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Woker', email: 'woker@example.com', tasks: [] });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
        expect(res.body.data).toHaveProperty('name', 'Woker');
    });

    it('Should fail due to incorrect type of input', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: '', email: 'wokerexample.com', tasks: [] });
        
        expect(res.statusCode).toBe(400);
        expect(Array.isArray(res.body.errors)).toBe(true);
        const nameErrors = res.body.errors.filter(err => err.path === 'name');
        expect(nameErrors).toBeDefined();
        const emailError = res.body.errors.find(err => err.path === 'email');
        expect(emailError).toBeDefined();
    });

    // Route Test - Get user

    it('Should get all users', async () => {
    await User.create([
        { name: 'Evans', email: 'Evans@example.com', tasks: [] },
        { name: 'Carlos', email: 'Carlos@example.com', tasks: [] }
    ]);

        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(2);
        });

    it('Should return an empty array if there are no users', async () => {
    const res = await request(app).get('/users');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(0);
    });

    // Route Test - Delete user

    it('Should delete a user by Id', async () => {
        const createUser = await request(app)
            .post('/users')
            .send({
                name: 'Woker',
                email: 'woker@example.com',
                tasks: []
            })
                
        expect(createUser.statusCode).toBe(201);
        const userId = createUser.body.data._id;
        const userEmail = createUser.body.data.email;
        const deleteUser = await request(app).delete(`/users/${userId}`);
        
        expect(deleteUser.statusCode).toBe(200);
        expect(deleteUser.body.data).toHaveProperty('email', userEmail);
        expect(deleteUser.body.data).toHaveProperty('_id', userId);
    });

    // Route Test - Update user

    it('Should successfully update the user name', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({ name: 'woker', email: 'woker@email.com', tasks: [] });

        const res = await request(app)
            .put(`/users/${newUser.body.data._id}`)
            .send({ name: 'Emma', email:'' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe('Emma');
        expect(res.body.data.email).toBe('woker@email.com');
    });

    it('Should successfully update the user email', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({ name: 'woker', email: 'woker@email.com', tasks: [] });

        const res = await request(app)
            .put(`/users/${newUser.body.data._id}`)
            .send({name: '', email:'asd@asd.com' });
        
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe('woker');
        expect(res.body.data.email).toBe('asd@asd.com');
    });

    it('Should return error if both fields are invalid or empty', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({ name: 'woker', email: 'woker@email.com', tasks: [] });

        const res = await request(app)
            .put(`/users/${newUser.body.data._id}`)
            .send({ name: '', email:'' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });
    it('Should return error if email field is invalid', async () => {
        const newUser = await request(app)
            .post('/users')
            .send({ name: 'woker', email: 'woker@email.com', tasks: [] });

        const res = await request(app)
            .put(`/users/${newUser.body.data._id}`)
            .send({ name: '', email: 'asda' });
        const userInDb = await User.findById(newUser.body.data._id);
        
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBeDefined();
            expect(userInDb.email).toBe('woker@email.com'); // Must be the same email when the user was created
    });
})