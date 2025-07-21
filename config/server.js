const express = require('express');
const connectDB = require('./db');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

connectDB();

app.use(express.json());
