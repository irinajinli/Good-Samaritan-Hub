"use strict";
const { mongoose } = require("../db/mongoose");
mongoose.set("bufferCommands", false);

const Admin = require("../models/admin");

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const log = console.log;

// POST route to log in and create session
router.post("/admin/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // find admin
  Admin.findOne({ username: username })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user._id;
        req.session.username = user.username;
        req.session.admin = true;
        res.status(200).send({ currUser: user, admin: true });
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

// POST route to create an admin
// <req.body> expects
// {
//     "username": String,
//     "password": String
// }
// router.post("/admin", mongoChecker, (req, res) => {
//   // password hashing
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(req.body.password, salt);
//   req.body.password = hash;

//   // Create a new admin
//   const admin = new Admin({
//     username: req.body.username,
//     password: req.body.password,
//     admin: true,
//   });

//   // Save admin to the database
//   save(req, res, admin);
// });

// GET route to get an admin by its id
// router.get("/admin/:id", mongoChecker, (req, res) => {
//   // Get admin by id
//   Admin.findById(req.params.id)
//     .then((admin) => {
//       if (admin) {
//         res.send(admin);
//       } else {
//         res.status(404).send(`Admin ${req.params.id} does not exist`);
//       }
//     })
//     .catch((error) => {
//       log(error);
//       res.status(500).send("Internal Server Error");
//     });
// });

// GET route to get all admins
// router.get("/admin", mongoChecker, (req, res) => {
//   find(req, res, Admin);
// });

module.exports = router;
