"use strict";
const log = console.log;

const express = require("express");
const session = require("express-session");
const app = express();

// Use cors middleware to allow requests from different origins
const cors = require("cors");
app.use(cors());

// Use body-parser middleware to parse HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/* Session handling */
// Create a session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    },
  })
);

/* API routes */
// Use the API routes in our route files
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const locationRoutes = require("./routes/location");
const messageRoutes = require("./routes/message");
const conversationRoutes = require("./routes/conversation");
const adminRoutes = require("./routes/admin");
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", locationRoutes);
app.use("/", messageRoutes);
app.use("/", conversationRoutes);
app.use("/", adminRoutes);

/* Webpage routes below */
// Serve the build
app.use(express.static(__dirname + "/../client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  log(req.url);

  // Check for page routes that we expect in the frontend to provide correct status code
  const goodPageRoutes = [
    "/",
    "/login",
    "/registration",
    "/admin",
    "/admin/home",
    "/home",
    "/profile",
    "/setting",
    "/inbox",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    // If url not in expected page routes, set status to 404
    res.status(404);
  }

  // Send index.html
  res.sendFile("client/build/index.html", { root: "../" });
});

// Listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
