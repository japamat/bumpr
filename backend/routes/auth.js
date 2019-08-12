/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");
const { authRequired } = require("../middleware/auth");


router.post("/login", async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

/**
 * Used to validate if a user already has a valid token
 */

router.get("/login", authRequired, async function(req, res, next) {
  try {
    return res.json({ user: req.username });
  } catch (e) {
    return next(e);
  }
});


module.exports = router;