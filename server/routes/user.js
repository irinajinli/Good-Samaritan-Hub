'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const User = require('../models/user');
const { mongoChecker, validateId, patch } = require('./common');

const express = require('express');
const router = express.Router();

// POST route to create a user
// <req.body> expects the following fields at minimum. See the User model for all fields.
// {
//     "username": String,
//     "password": String,
//     "firstName": String,
//     "lastName": String,
//     "location": String
// }
router.post('/user', mongoChecker, (req, res) => {
    // Create a new user
    const user = new User(req.body);

    // Save user to the database
    user.save()
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            if (isMongoError(error)) {
                res.status(500).send('Internal server error');
            } else {
                log(error);
                res.status(400).send('Bad Request');
            }
        });
});

// GET route to get all users
router.get('/users', mongoChecker, (req, res) => {
    // Get all users
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

// PATCH route to update a user.
// <req.param.id> is the user's id.
// <req.body will be an array that consists of a list of changes to make to the post
// [
//   { "op": "replace", "path": "/posts", "value": ["f24c5fa61604f593432852b"] }
//   ...
// ]
router.patch('/user/:id', mongoChecker, validateId, (req, res) => { 
    patch(req, res, User);
});

module.exports = router;