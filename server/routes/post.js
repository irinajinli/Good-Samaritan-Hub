'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const Post = require('../models/post');
const { mongoChecker, validateId } = require('./common');

const express = require('express');
const router = express.Router();

// A POST Route for making a post.
// <param.id> is the posterId.
// <req.body> expects the following format:
// {
//     "title": "Grocery Pickup",
//     "body": "Lorem ipsum dolor",
//     "type": "Request",
//     "date": "July 17, 2020 03:24:00",
//     "status": "active",
//     "location": "M4P"
// }
router.post('/post/:id', mongoChecker, validateId, (req, res) => {
    // Get poster id from <id> param
    const posterId = req.params.id;
    req.body.posterId = posterId;

    // Parse date string
    req.body.date = new Date(req.body.date);

    // Create a new post
    const post = new Post(req.body);

    // Save post to the database
    post.save()
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

// GET route to get all posts
router.get('/posts', mongoChecker, (req, res) => {
    // Get all posts
    Post.find()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

// PATCH route to update a post
// <param.id> is the post's id
// <re.body will be an array that consists of a list of changes to make to the post
// [
//   { "op": "replace", "path": "/status", "value": "inactive" }
//   ...
// ]
router.patch('/post/:id', mongoChecker, validateId, (req, res) => {
	// Find the fields to update and their values.
	const fieldsToUpdate = {};
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1); // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value;
	})

    // Update the post
    Post.findByIdAndUpdate(req.params.id, {$set: fieldsToUpdate}, {new:true, useFindAndModify: false})
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
});

module.exports = router;