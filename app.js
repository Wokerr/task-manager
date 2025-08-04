const express = require('express');
const app = express();
const apiRoutes = require('./routes/routes');
require('dotenv').config();

app.use(express.json());
app.use('/', apiRoutes);


module.exports = app;