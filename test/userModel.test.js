const mongoose = require('mongoose');
const User = require('../models/User');
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

describe('User Model', () => {
    it('Should create a user successfully', async () => {
        const user = new User({
            name: 'Emmanuel',
            email: 'emmanuel123@gmail.com',
            password: '1234asd678',
            tasks:[]
        });
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('Emmanuel');
        expect(savedUser.email).toBe('emmanuel123@gmail.com');
        expect(savedUser.password).toBeDefined();
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
        expect(error.errors.password).toBeDefined();
    });
})