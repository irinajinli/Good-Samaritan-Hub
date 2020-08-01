'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
const { ObjectID } = require('mongodb');

// Helper function that checks if Mongo database suddently disconnected
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
}

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

// Middleware to check that <req.params.id> is a valid Object ID
const validateId = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send()
        return;
    } else {
        next()
    }
}

// Generic PATCH function to update <mongooseModel> document
// <req.body> will be an array that consists of a list of changes to make
// Example:
// [
//   { "op": "replace", "path": "/posts", "value": [f24c5fa61604f593432852b] }
//   ...
// ]
const patch = (req, res, mongooseModel) => {
	// Find the fields to update and their values.
	const fieldsToUpdate = {};
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1); // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value;
	})

    // Update the document
    mongooseModel.findByIdAndUpdate(req.params.id, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        .then((post) => {
            if (!post) {
                res.status(404).send('Resource not found');
            } else {   
                res.send(post);
            }
        })
        .catch((error) => {
            if (isMongoError(error)) {
                res.status(500).send('Internal server error')
            } else {;
                log(error);
                res.status(400).send('Bad Request');
            }
        });
}

module.exports = {
    isMongoError,
    mongoChecker,
    validateId,
    patch
};