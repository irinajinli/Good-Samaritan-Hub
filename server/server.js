'use strict';
const log = console.log;

const express = require('express');
const app = express();

// Use cors middleware to allow requests from different origins
const cors = require('cors');
app.use(cors());

// Use body-parser middleware to parse HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use the API routes in our route files
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
app.use('/', userRoutes);
app.use('/', postRoutes);

// Listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});