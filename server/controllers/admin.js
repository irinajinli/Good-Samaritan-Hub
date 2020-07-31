'use strict';
const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);
const Admin = mongoose.model('Admin');
const { isMongoError } = require('./common.js');

const addAdmin = (req, res) => {
    // Check if mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error');
        return;
    }

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
}

const getAdminById = (req, res) => {
    // Check if mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error');
        return;
    }

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
}

const getAllAdmins = (req, res) => {
    // Check if mongoose connection established
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error');
        return;
    }

    // Get all admins
    Admin.find()
        .then((admins) => {
            res.send(admins);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
}

module.exports = {
    addAdmin,
    getAdminById,
    getAllAdmins
}