'use strict';
const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const Admin = mongoose.model('Admin');

const { mongoChecker, isMongoError } = require('./common');

const express = require('express');
const router = express.Router();

// POST route to create an admin
// <req.body> expects
// {
//     "username": String,
//     "password": String
// }
router.post('/admin', mongoChecker, (req, res) => {
    // Create a new admin
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    // Save admin to the database
    admin.save()
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

// GET route to get an admin by its id
router.get('/admin/:id', mongoChecker, (req, res) => {
    // Get admin by id
    Admin.findById(req.params.id)
        .then((admin) => {
            if (admin) {
                res.send(admin);
            } else {
                res.status(404).send(`Admin ${req.params.id} does not exist`);
            }
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

// GET route to get all admins
router.get('/admin', mongoChecker, (req, res) => {
    // Get all admins
    Admin.find()
        .then((admins) => {
            res.send(admins);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

module.exports = router;