'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
const { ObjectID } = require('mongodb');

// Middleware to check if mongoose connection is established
const mongoChecker = (req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send('Internal server error');
        return;
    } else {
        next();
    }
}

// Middleware to check that <req.id> is a valid Object ID
const validateId = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send()
        return;
    } else {
        next()
    }
}

// Helper function that checks if Mongo database suddently disconnected
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
}

module.exports = {
    mongoChecker,
    validateId,
    isMongoError
};