'use strict';

const express = require('express');
const router = express.Router();

/* Common middleware functions */
const { mongoChecker } = require('../controllers/common');

/* Controllers */
const userCtrl = require('../controllers/user');

/* Admin routes */

/* User routes */
router.post('/user', mongoChecker, userCtrl.addUser);
router.get('/users', mongoChecker, userCtrl.getAllUsers);

/* Post routes */

/* Conversation routes */

/* Message routes */

module.exports = router;