'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let Messages = require('../models/message');
const { mongoChecker, validateId, patch } = require('./common');

const express = require('express');
const router = express.Router();


//Gets all messages
router.get('/messages', (req, res) => {
    Messages.find()
        .then(messages => res.send(messages))
        .catch((err) => {
            log(err);
            res.status(500).send("Internal Server Error");
        });
});


/* Posts a new message
{
    "messageSender": "user",
    "messageReceiver": "user2",
    "messageContent": "Lorem Ipsum",
}
*/
router.post('/messages', (req, res) => {
    const message = new Messages({
        messageSender: req.body.messageSender,
        messageReceiver: req.body.messageReceiver,
        messageContent: req.body.messageContent,
    })

    message.save().then(result => res.send(result))
        .catch((error) => {
            console.log(error)
            res.status(400).send('Bad Request') 
    })
});

//Gets all messages of a certain user
router.get('/messages/:username' ,(req, res) => {
    const username = req.params.username;
    Messages.find({$or: [
        {messageReceiver: username},
        {messageSender: username}
    ]})
        .then(messages => {
            res.send(messages)
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

// PATCH route to update a message
// <req.params.id> is the message's id
// <req.body> will be an array that consists of a list of changes to make to the message.
// [
//   { "op": "replace", "path": "/messageContent", "value": "Sup" }
//   ...
// ]
router.patch('/messages/:id', mongoChecker, validateId, (req, res) => { 
    patch(req, res, Messages, { _id: req.params.id });
});

module.exports = router;