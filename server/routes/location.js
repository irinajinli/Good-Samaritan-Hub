'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const Location = require('../models/location');
const { mongoChecker, authenticateAdmin, save, find } = require('./common');

const express = require('express');
const router = express.Router();

// POST route to add a location
// <req.body> expects the following format:
// {
//     "postalCode": "M4P",
//     "lat": 43.697225,
//     "lon": -79.412968
// }
router.post('/location', mongoChecker, authenticateAdmin, (req, res) => {
    // Create a new location
    const location = new Location(req.body);

    // Add the location to the database
    save(req, res, location);
});

// GET route to get all locations
router.get('/locations', mongoChecker, (req, res) => {
    find(req, res, Location);
});

module.exports = router;