'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let Messages = require('../models/message');
const { mongoChecker, validateId, patch, authenticateUserOrAdmin, authenticateAdmin} = require('./common');

const express = require('express');
const router = express.Router();


//Gets all messages
router.get('/messages', authenticateAdmin, (req, res) => {
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
    if (req.session.username == req.body.messageSender) {
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
    } else {
        res.status(401).send("Unauthorized");
    }
});

//Gets all messages of a certain user
router.get('/messages/:username', authenticateUserOrAdmin, (req, res) => {
    const username = req.params.username;

    if (req.session.username == username || req.session.admin) {
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
    } else {
        res.status(401).send("Unauthorized");
    }
});

// PATCH route to update a message
// <req.params.id> is the message's id
// <req.body> will be an array that consists of a list of changes to make to the message.
// [
//   { "op": "replace", "path": "/messageContent", "value": "Sup" }
//   ...
// ]
router.patch('/messages/:id', mongoChecker, validateId, (req, res) => { 
    const fieldsToUpdate = {};
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1); // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value;
    })
    
    Messages.findById(req.params.id)
    .then(message => {
        if((message.messageReceiver == req.session.username && Object.keys(fieldsToUpdate).length == 1 && fieldsToUpdate.isReported == true) || req.session.admin) {
            patch(req, res, Messages, { _id: req.params.id });
        }
    })
});

module.exports = router;