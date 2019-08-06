/** Routes for users. */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Message = require("../models/messages");
const { validate } = require("jsonschema");
const jwt = require("jsonwebtoken");

const { addMessageSchema, updateMessageSchema } = require("../schemas");

const createToken = require("../helpers/createToken");


/** GET / => {users: [user, ...]} */

router.get("/new", async function(req, res, next) {
  try {
    let { offset, limit } = req.query;
    const messages = await Message.findNew(offset, limit);
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

/** GET /[message] => {message: message} */
// works from jobly to warbler

router.get("/:id", async function(req, res, next) {
  try {
    const message = await Message.findOne(req.params.id);
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

/** POST / {message data}  => {message: message} */
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

/** PATCH /[username]/[message id] {message} => {message: updatedMessage} */
// works from jobly to warbler

router.patch("/:username/:id", authRequired, ensureCorrectUser, async function(req, res, next) {
  try {
    if ("username" in req.body || "is_admin" in req.body) {
      return next({ status: 400, message: "Not allowed" });
    }

    const validation = validate(req.body, updateMessageSchema);
    if (!validation.valid) {
      return next({
        status:400,
        message: validation.errors.map(e => e.stack)
      });
    }
    const message = await Message.edit(req.params.id, req.body.message);
    return res.json({ message });
  }

  catch (err) {
    return next(err);
  }
});

/** DELETE /[username]/[message id]  =>  {message: "Message deleted"}  */
// works from jobly to warbler

router.delete("/:username/:id", authRequired, ensureCorrectUser, async function(req, res, next) {
  try {
    await Message.remove(+req.params.id);
    return res.json({ message: "Message deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
