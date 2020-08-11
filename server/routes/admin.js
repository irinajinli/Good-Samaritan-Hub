"use strict";
const { mongoose } = require("../db/mongoose");
mongoose.set("bufferCommands", false);

const Admin = require("../models/admin");

const { mongoChecker, isMongoError, save } = require("./common");

const express = require("express");
const router = express.Router();
const log = console.log;

// POST route to log in and create session
router.post("/admin/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log(username, password);

  // find user
  Admin.findOne({ username: username, password: password })
    .then((user) => {
      log(user);
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.admin = true;
      res.status(200).send({ currUser: user, admin: true });
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
// TODO delete; already in user.js routes
// router.get("/users/check-session", (req, res) => {
//   if (req.session.user) {
//     res.send({
//       userId: req.session.user,
//       username: req.session.username,
//     });
//   } else {
//     res.status(401).send();
//   }
// });

//************************* */

// POST route to create an admin
// <req.body> expects
// {
//     "username": String,
//     "password": String
// }
router.post("/admin", mongoChecker, (req, res) => {
  // Create a new admin
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
    admin: true,
  });

  // Save admin to the database
  save(req, res, admin);
});

// GET route to get an admin by its id
router.get("/admin/:id", mongoChecker, (req, res) => {
  // Get admin by id
  Admin.findById(req.params.id)
    .then((admin) => {
      if (admin) {
        res.send(admin);
      } else {
        res.status(404).send(`Admin ${req.params.id} does not exist`);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// GET route to get all admins
router.get("/admin", mongoChecker, (req, res) => {
  find(req, res, Admin);
});

module.exports = router;
