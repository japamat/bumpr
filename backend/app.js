/** Express app for jobly. */


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// add logging system

const morgan = require("morgan");
app.use(morgan("tiny"));


const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");
const followersRoutes = require("./routes/followers");
const followingRoutes = require("./routes/following");
const followRoutes = require("./routes/follow");
const authRoutes = require("./routes/auth");

app.use("/users", usersRoutes);
app.use("/messages", messagesRoutes);
app.use("/follow", followRoutes);
app.use("/followers", followersRoutes);
app.use("/following", followingRoutes);
app.use("/", authRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
