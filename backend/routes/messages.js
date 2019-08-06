/** Routes for users. */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Message = require("../models/messages");
const { validate } = require("jsonschema");
const jwt = require("jsonwebtoken");

const { addMessageSchema } = require("../schemas");

const createToken = require("../helpers/createToken");


/** GET / => {users: [user, ...]} */

router.get("/", async function(req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  }

  catch (err) {
    return next(err);
  }
});

/** GET /[username] => {user: user} */

router.get("/:username", async function(req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  }

  catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {token: token} */
// works from jobly to warbler

router.post("/", authRequired, async function(req, res, next) {
  try {
    delete req.body._token;
    const validation = validate(req.body, addMessageSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const message = await Message.add({ ...req.body, username: req.username });
    return res.status(201).json({ message, });
  }
  catch (e) {
    return next(e);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */
// works from jobly to warbler

router.patch("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    if ("username" in req.body || "is_admin" in req.body) {
      return next({status: 400, message: "Not allowed" });
    }

    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      return next({
        status:400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({user});
  }

  catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:username/:id", authRequired, ensureCorrectUser, async function(req, res, next) {
  try {
    await Message.remove(+req.params.id);
    return res.json({ message: "Message deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
