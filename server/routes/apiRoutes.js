'use strict';

const express = require('express');
const router = express.Router();

/* Controllers */
const userCtrl = require('../controllers/user');

/* API routes for managing users */
router.post('/user', userCtrl.addUser);
router.get('/users', userCtrl.getAllUsers);

/* API routes for managing posts */

/* API routes for managing conversations */

/* API routes for managing messages */

module.exports = router;