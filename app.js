const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
require('dotenv').config();

app.use(express.json());
app.use('/', userRoutes);


module.exports = app;