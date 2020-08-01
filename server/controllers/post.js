'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const Post = require('../models/post');
const { isMongoError } = require('./common.js');

const addPost = (req, res) => {
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
}

const getAllPosts = (req, res) => {
    // Get all posts
    Post.find()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
}

module.exports = {
    addPost,
    getAllPosts
}