'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const User = require('../models/user');

const { isMongoError } = require('./common.js');


const addUser = (req, res) => {
    // Check if mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error');
        return;
    }

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

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
}

const getAllUsers = (req, res) => {
    // Check if mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error');
        return;
    }

    // Get all users
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
}

module.exports = {
    addUser,
    getAllUsers
}