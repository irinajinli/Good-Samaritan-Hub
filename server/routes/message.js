'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let Messages = require('../models/message');

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
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
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
            console.log(messages)
        })
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

module.exports = router;