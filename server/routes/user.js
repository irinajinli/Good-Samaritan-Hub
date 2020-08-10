"use strict";
const log = console.log;

const { mongoose } = require("../db/mongoose");
mongoose.set("bufferCommands", false);

const User = require("../models/user");
const {
  isMongoError,
  mongoChecker,
  validateId,
  patch,
  save,
  find,
  findOne,
} = require("./common");

const express = require("express");
const router = express.Router();

// POST route to log in and create session
router.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log(username, password);

  // find user
  User.findOne({ username: username, password: password })
    .then((user) => {
      log(user.location);
      req.session.user = user._id;
      req.session.username = user.username;
      res.status(200).send({ currUser: user });
    })

    .catch((error) => {
      log(error);
      res.status(400).send();
    });
});

// A route to logout a user
router.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

// A route to check if a use is logged in on the session cookie
router.get("/users/check-session", (req, res) => {
  if (req.session.user) {
    res.send({
      userId: req.session.user,
      username: req.session.username,
    });
  } else {
    res.status(401).send();
  }
});

/*********************************************************/

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

// GET route to get all users whose username or full name contains <req.params.searchTerm>
router.get("/user/searchTerm/:searchTerm", (req, res) => {
  console.log(req.params.searchTerm);
  let searchTerm = req.params.searchTerm.trim();
  User.find()
    .then((result) => {
      let matchingUsers = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
          searchTerm.length !== 0 &&
          (user.username.search(new RegExp(searchTerm, "i")) !== -1 ||
            fullName.search(new RegExp(searchTerm, "i")) !== -1)
        );
      });
      matchingUsers = matchingUsers.map((user) => {
        return {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          bio: user.bio,
        };
      });
      res.send(matchingUsers);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        log(error);
        res.status(400).send("Bad Request");
      }
    });
});

// PATCH route to update a user by username
// <req.body> will be an array that consists of a list of changes to make to the user
// [
//   { "op": "replace", "path": "/postsHiddenFromUser", "value": ["f24c5fa61604f593432852b"] }
//   ...
// ]
router.patch("/user/username/:username", mongoChecker, (req, res) => {
	// // Find the fields to update and their values.
	// const fieldsToUpdate = {};
	// req.body.map((change) => {
	// 	const propertyToChange = change.path.substr(1); // getting rid of the '/' character
	// 	fieldsToUpdate[propertyToChange] = change.value;
	// })
  // // Check that the current user / admin is authorized to update the fields in fieldsToUpdate
  // if (req.session.type === 'user' && req.session.username === req.params.username) {
  //   if there is an element in fieldsToUpdate that is not in ['firstName', 'lastName', 'bio', 'location'] {
  //     send 401 unathorized and return
  //   }
  // } else if (req.session.type === 'user') {
  //   if (there is an element in fieldsToUpdate that is not in ['isReported'] || fieldsToUpdate['isReported] === false) {
  //     send 401 unathorized and return
  //   }
  // } else if (req.session.type === 'admin') {
  //   if (there is an element in fieldsToUpdate that is not in ['isReported', 'isBanned', 'banReason']) {
  //     send 401 unathorized and return
  //   }
  // } else {
  //   // neither user nor admin is logged in, or user is not authorized to update the given fields and values
  //   send 401 unathorized and return
  // }

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
  User.findOneAndReplace({ _id: req.params.id }, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal server error");
    });
});

module.exports = router;
