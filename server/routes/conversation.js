'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

let User = require('../models/user');

const { authenticateUserOrAdmin } = require('./common');
const express = require('express');
const router = express.Router();

/* Get a conversation for a single user
Users can only access their own conversation, admins can get an user's conversation
Expected Response: [{username: String, lastMessageTime: Date, post: ObjectID} ...] or 401 Unauthorized 
*/
router.get('/conversations/:username', authenticateUserOrAdmin, (req, res) => {
    const username = req.params.username;
    if(username == req.session.username || req.session.admin) {
        User.findOne({username: username})
            .then(conversations => res.send(conversations.conversations))
            .catch((error) => {
                log(error);
                res.status(500).send("Internal Server Error");
            });
    } else {
        res.status(401).send("Unauthorized");
    }
});

/* Create a conversation
Updates both the conversation for both the user and the user being message
Expected Body: {"messagedUser": String}
Expected Response: Updated Conversation for user or 401 Unauthorized
*/
router.post('/conversations/:username', authenticateUserOrAdmin, (req, res) => {
    const username = req.params.username;
    const curr_date = Date.now()
    if(username == req.session.username || req.session.admin) {
        User.findOne({username: username}).then((conversations) => {
            if(!conversations) {
                res.status(404).send('Resource not found')
            } else {
                const conversation = {
                    username: req.body.messagedUser,
                    lastMessageTime: curr_date
                }
                conversations.conversations.push(conversation)

                User.findOne({username: req.body.messagedUser}).then((conversations2) => {
                    if(!conversations2) {
                        res.status(404).send('Resource not found')
                    } else {
                        const conversation2 = {
                            username: username,
                            lastMessageTime: curr_date
                        }
                        conversations2.conversations.push(conversation2)

                        conversations2.save()
                        .catch((error) => {
                            console.log(error)
                            res.status(400).send('Bad Request')  // server error
                        })
                    }
                })

                conversations.save().then((result) => {
                    res.send(result)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).send('Bad Request')  // server error
                })

            }
        })
    } else {
        res.status(401).send("Unauthorized");
    }
});

/* Updates a conversation's attributes
Expected Body: {"messagedUser": String, "Post": ObjectID}
Expected Response: 200 if conversation is updated or 401 unauthorized
*/
router.put('/conversations/:username', authenticateUserOrAdmin, (req, res) => {
    const username = req.params.username;
    const curr_date = Date.now()
    if(username == req.session.username || req.session.admin) {
        User.updateOne({
            username: username,
            'conversations.username': req.body.messagedUser
        }, {
            $set: {
                'conversations.$.post': req.body.post,
                'conversations.$.lastMessageTime': curr_date
            }
        },
        (err) => {
            if(!err) {
                User.updateOne({
                    username: req.body.messagedUser,
                    'conversations.username': username
                }, {
                    $set: {
                        'conversations.$.post': req.body.post,
                        'conversations.$.lastMessageTime': curr_date
                    }
                }, (err) => {
                    if(err) {
                        res.send(err)
                    }
                })
                res.send("Updated conversation")
            } else {
                res.send(err)
            }
        })
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;