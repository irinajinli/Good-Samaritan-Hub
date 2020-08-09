'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let Conversation = require('../models/conversation');

const express = require('express');
const router = express.Router();

router.get('/conversations', (req, res) => {
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

    Conversation.findOne({username: username})
        .then(conversations => res.send(conversations.conversations))
        .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

router.post('/conversations/:username', (req, res) => {
    const username = req.params.username;
    
    Conversation.findOne({username: username}).then((conversations) => {
        if(!conversations) {
            res.status(404).send('Resource not found')
        } else {
            const conversation = {
                username: req.body.messagedUser,
                name: req.body.messagedName,
                lastMessageTime: Date.now()
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

router.put('/conversations/:username', (req, res) => {
    const username = req.params.username;
    
    Conversation.updateOne({
        username: username,
        'conversations.username': req.body.messagedUser
    }, {
        $set: {
            'conversations.$.lastMessageTime': Date.now()
        }
    },
    (err) => {
        if(!err) {
            res.send("Updated conversation")
        } else {
            res.send(err)
        }
    })
});


router.patch('/conversations/:username', (req, res) => {
    const username = req.params.username;
    Conversation.updateOne(
        {username: username},
        {$set: {conversations: req.body}},
        (err) => {
            if(!err) {
                res.send("Updated conversation")
            } else {
                res.send(err)
            }
        }
    )
});


module.exports = router;