"use strict";
const log = console.log;

const { mongoose } = require("../db/mongoose");
mongoose.set("bufferCommands", false);

const User = require("../models/user");
const {
  isMongoError,
  mongoChecker,
  authenticateAdmin,
  authenticateUserOrAdmin,
  validateId,
  patch,
  save,
  find,
  findOne,
  authenticateUser,
} = require("./common");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

/****************** Helper Functions *******************/

// Returns <user>'s profile info
const userProfileInfo = (user) => {
  return {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    bio: user.bio,
  };
};

// Return <user> without confidential info
const userSafeInfo = (user) => {
  const newUser = JSON.parse(JSON.stringify(user));
  delete newUser.password;
  delete newUser.email;
  delete newUser.postsHiddenFromUser;
  return newUser;
};

/*******************************************************/

/****************** Session Handling *******************/

// POST route to log in and create session
router.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // find user
  User.findOne({ username: username })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user._id;
        req.session.username = user.username;
        req.session.admin = false;
        res.status(200).send({ currUser: user, admin: false });
      } else {
        // wrong password
        res.status(404).send();
      }
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

// A route to check if a user is logged in on the session cookie
router.get("/users/check-session", authenticateUserOrAdmin, (req, res) => {
  // ADMIN
  if (req.session.admin) {
    Admin.findById(req.session.user)
      .then((user) => {
        res.status(200).send({ user: user, admin: true });
      })
      .catch((error) => {
        log(error);
        res.status(400).send();
      });
  } else {
    // NORMAL USER
    User.findById(req.session.user)
      .then((user) => {
        res.status(200).send({ user: user });
      })
      .catch((error) => {
        log(error);
        res.status(400).send();
      });
  }
});

/*******************************************************/

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
  // password hashing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;

  // Create a new user
  const user = new User(req.body);
  res.send(200);
  // Save user to the database
  save(req, res, user);
});

// GET route that returns whether the specified username already exists
router.get("/user/check-username/:username", mongoChecker, (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (user) {
        res.send({result: "Username exists"});
      } else {
        res.send({result: "Username does not exist"});
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
})

// GET route to get a user by username
router.get(
  "/user/username/:username",
  mongoChecker,
  authenticateUserOrAdmin,
  (req, res) => {
    User.findOne({ username: req.params.username })
      .then((user) => {
        if (user) {
          res.send(userProfileInfo(user));
        } else {
          res.status(404).send();
        }
      })
      .catch((error) => {
        log(error);
        res.status(500).send("Internal Server Error");
      });
  }
);

// GET route to get all users
router.get("/users", mongoChecker, authenticateAdmin, (req, res) => {
  User.find()
    .then((result) => {
      res.send(result.map((user) => userSafeInfo(user)));
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

// GET route to get all non-banned users whose username or full name contains <req.params.searchTerm>
router.get(
  "/user/searchTerm/:searchTerm",
  authenticateUserOrAdmin,
  (req, res) => {
    console.log(req.params.searchTerm);
    let searchTerm = req.params.searchTerm.trim();
    User.find()
      .then((result) => {
        // Filter out users who don't match the search term
        let matchingUsers = result.filter((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          return (
            searchTerm.length !== 0 &&
            (user.username.search(new RegExp(searchTerm, "i")) !== -1 ||
              fullName.search(new RegExp(searchTerm, "i")) !== -1)
          );
        });

        // Filter out banned users
        matchingUsers = matchingUsers.filter((user) => !user.isBanned);

        // Only send the users' profile info
        matchingUsers = matchingUsers.map((user) => userProfileInfo(user));

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
  }
);

// PATCH route to update a user by username
// <req.body> will be an array that consists of a list of changes to make to the user
// [
//   { "op": "replace", "path": "/postsHiddenFromUser", "value": ["f24c5fa61604f593432852b"] }
//   ...
// ]
router.patch(
  "/user/username/:username",
  mongoChecker,
  authenticateUserOrAdmin,
  (req, res) => {
    // Find the fields to update and their values.
    const fieldsToUpdate = {};
    req.body.map((change) => {
      const propertyToChange = change.path.substr(1); // getting rid of the '/' character
      fieldsToUpdate[propertyToChange] = change.value;
    });

    // Check that the current user/admin is authorized to update the fields in fieldsToUpdate
    const validAdminProps = ["isReported", "isBanned", "banReason"];
    const validProfileProps = ["firstName", "lastName", "bio", "location"];

    const fields = Object.keys(fieldsToUpdate);
    log(fields);

    if (req.session.admin) {
      // admin updating a user

      // Only allowed to change properties in validAdminProps
      for (let i = 0; i < fields.length; i++) {
        if (!validAdminProps.includes(fields[i])) {
          res.status(401).send("Unauthorized");
          return;
        }
      }
    } else if (req.session.username === req.params.username) {
      // regular user updating themself

      // Only allowed to change properties in validProfileProps
      for (let i = 0; i < fields.length; i++) {
        if (!validProfileProps.includes(fields[i])) {
          res.status(401).send("Unauthorized");
          return;
        }
      }
    } else {
      // regular user updating another user

      // Only allowed to change 'isReported' to true
      for (let i = 0; i < fields.length; i++) {
        if (
          !(fields[i] === "isReported" && fieldsToUpdate["isReported"] === true)
        ) {
          res.status(401).send("Unauthorized");
          return;
        }
      }
    }

    patch(req, res, User, { username: req.params.username });
  }
);

// PATCH route to update a user by username
// <req.param> is the user's username and current password.
// <req.body> will be an array that consists of one object to replace a password for a user
// NOTE: Passwords in param and body are not encypted
// [
//   { "op": "replace", "path": "/password", "value": "f24c5fa61604f593432852b" }
//   ...
// ]
router.patch(
  "/user/username/:username/:password",
  mongoChecker,
  authenticateUserOrAdmin,
  (req, res) => {
    // Find the fields to update and their values.
    const fieldsToUpdate = {};
    req.body.map((change) => {
      const propertyToChange = change.path.substr(1); // getting rid of the '/' character
      fieldsToUpdate[propertyToChange] = change.value;
    });

    if (req.session.username === req.params.username) {
      // Only allowed to change properties if req.param.password matches db
      User.findOne({ username: req.params.username })
        .then((user) => {
          if (bcrypt.compareSync(req.params.password, user.password)) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body[0].value, salt);
            req.body[0].value = hash;
            patch(req, res, User, { username: req.params.username });
          } else {
            // wrong password
            res.status(401).send();
          }
        })
        .catch((error) => {
          res.status(400).send();
        });
    }
  }
);

module.exports = router;
