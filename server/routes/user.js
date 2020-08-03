"use strict";
const log = console.log;

const { mongoose } = require("../db/mongoose");
mongoose.set("bufferCommands", false);

const User = require("../models/user");
const {
  mongoChecker,
  validateId,
  patch,
  save,
  find,
  findOne,
} = require("./common");

const express = require("express");
const router = express.Router();

// POST route to create a user
// <req.body> expects the following fields at minimum. See the User model for all fields.
// {
//     "username": String,
//     "password": String,
//     "firstName": String,
//     "lastName": String,
//     "location": String
// }
router.post("/user", mongoChecker, (req, res) => {
  // Create a new user
  const user = new User(req.body);

  // Save user to the database
  save(req, res, user);
});

// GET route to get a user by id
router.get("/user/:id", mongoChecker, validateId, (req, res) => {
  findOne(req, res, User, { _id: req.params.id });
});

// GET route to get a user by username
router.get("/user/username/:username", mongoChecker, (req, res) => {
  findOne(req, res, User, { username: req.params.username });
});

// GET route to get all users
router.get("/users", mongoChecker, (req, res) => {
  find(req, res, User);
});

// PATCH route to update a user by username
// <req.body> will be an array that consists of a list of changes to make to the user
// [
//   { "op": "replace", "path": "/postsHiddenFromUser", "value": ["f24c5fa61604f593432852b"] }
//   ...
// ]
router.patch("/user/username/:username", mongoChecker, (req, res) => {
  patch(req, res, User, { username: req.params.username });
});

// PUT route to replace a user.
// <req.param.id> is the user's id.
// <req.body> expects the following fields at minimum. See the User model for all fields.
// {
//     "username": String,
//     "password": String,
//     "firstName": String,
//     "lastName": String,
//     "location": String
// }
router.put("/user/:id", mongoChecker, validateId, (req, res) => {
  User.findOneAndReplace({_id: req.params.id}, req.body, {new: true, useFindAndModify: false})
	.then((user) => {
		if (user) {
			res.send(user);
		} else {
			res.status(404).send();
		}
	})
	.catch((error) => {
    log(error);
    res.status(500).send('Internal server error');
	});
});

// POST route to log in and create session
router.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log(username, password);

  // find user
  User.findbyUsernamePassword(username, password)
    .then((user) => {
      req.session.user = user._id;
      req.ession.username = user.username;
      res.send({ currentUser: user.username });
    })

    .catch((error) => {
      res.status(400).send();
    });
});

module.exports = router;
