'use strict';

const express = require('express');
const router = express.Router();

/* Common middleware functions */
const { mongoChecker, validateId } = require('../controllers/common');

/* Controllers */
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

/* Admin routes */

/* User routes */
router.post('/user', mongoChecker, userCtrl.addUser);
router.get('/users', mongoChecker, userCtrl.getAllUsers);

/* Post routes */
router.post('/post/:id', mongoChecker, validateId, postCtrl.addPost);
router.get('/posts', mongoChecker, postCtrl.getAllPosts);

/* Conversation routes */

/* Message routes */

module.exports = router;