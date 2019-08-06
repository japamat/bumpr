/** Routes for users. */

const express = require("express");
const router = express.Router();

const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const Follow = require("../models/follow");
const { validate } = require("jsonschema");

const { userNewSchema, userUpdateSchema } = require("../schemas");

const createToken = require("../helpers/createToken");


/** GET / => {followers: [user, ...]} */

router.get("/:username", async function(req, res, next) {
  try {
    const followers = await Follow.findFollowers(req.params.username);
    return res.json({ followers });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
