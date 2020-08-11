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

// Middleware for verifying that current session is an admin session
const authenticateAdmin = (req, res, next) => {
	if (req.session.user && req.session.admin) {
        next();
	} else {
		res.status(401).send("Unauthorized");
	}
}

// Middleware for verifying that the current session is a user session
const authenticateUser = (req, res, next) => {
	if (req.session.user && !req.session.admin) {
        next();
	} else {
		res.status(401).send("Unauthorized");
	}
}

// Middleware for verifying that the current session is an admin or user session
const authenticateUserOrAdmin = (req, res, next) => {
	if (req.session.user) {
        next();
	} else {
		res.status(401).send("Unauthorized");
	}
}

// Middleware to check that <req.params.id> is a valid Object ID
const validateId = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send();
        return;
    } else {
        next();
    }
}

// Generic function to update a <MongooseModel> document for a PATCH route to update
// a document matching <filter>
// <req.body> will be an array that consists of a list of changes to make.
// Example:
// [
//   { "op": "replace", "path": "/postsHiddenFromUser", "value": ["f24c5fa61604f593432852b"] }
//   ...
// ]
const patch = (req, res, MongooseModel, filter) => {
	// Find the fields to update and their values.
	const fieldsToUpdate = {};
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1); // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value;
	})

    // Update the document
    MongooseModel.findOneAndUpdate(filter, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        .then((result) => {
            if (!result) {
                res.status(404).send('Resource not found');
            } else {   
                res.send(result);
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

// Generic function to save a document
const save = (req, res, document) => {
    document.save()
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

// Generic function to get all documents in <MongooseModel> that match <filter>.
// If <filter> is not specified, this function gets all documents in <MongooseModel>.
const find = (req, res, MongooseModel, filter) => {
    if (!filter) {
        filter = {};
    }
    MongooseModel.find(filter)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error");
            } else {
                log(error);
                res.status(400).send("Bad Request");
            }
        });
}

// Generic function to find one document in <MongooseModel> by <conditions>
const findOne = (req, res, MongooseModel, conditions) => {
    MongooseModel.findOne(conditions)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send();
            }
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
}

module.exports = {
    isMongoError,
    authenticateAdmin,
    authenticateUser,
    authenticateUserOrAdmin,
    mongoChecker,
    validateId,
    patch,
    save,
    find,
    findOne
};