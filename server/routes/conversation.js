'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let Conversation = require('../models/conversation');

const express = require('express');
const router = express.Router();

route.get('/conversations', (req, res) => {
    Conversation.find()
        .then(conversations => res.send(conversations))
        .catch((err) => {
            log(err);
            res.status(500).send("Internal Server Error");
        });
});
router.post('/conversations', (req, res) => {
    const conversation = new Conversation({
        username: req.body.username,
        conversations: []
    })

    conversation.save().then(res.send("Created conversation"))
        .catch((error) => {
            console.log(error)
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
    })
});

router.get('/conversations/:username' ,(req, res) => {
    const username = req.params.username;

    Conversation.find({username: username})
        .then(conversations => res.send(conversations))
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

router.post('/conversations/:username', (req, res) => {
    const username = req.params.username;
    
    Conversation.find({username: username}).then((conversations) => {
        if(!conversations) {
            res.status(404).send('Resource not found')
        } else {
            const conversation = {
                username: req.body.messagedUser,
                name: req.body.messagedName,
                lastMessageTime: new Date(req.body.messagedLastMessageTime)
            }
            conversations.conversations.push(conversation)

            conversations.save().then((result) => {
				res.send(result)
            })
            .catch((error) => {
                console.log(error)
				res.status(400).send('Bad Request')  // server error
			})

        }
    })
});

module.exports = router;