/** Routes for users. */

const express = require("express");
const router = express.Router();

const Follow = require("../models/follow");
const { authRequired } = require("../middleware/auth");


/** GET / => {users: [user, ...]} */

router.post("/:username", authRequired, async function(req, res, next) {
  try {
    const follow = await Follow.follow(req.params.username, req.username);
    return res.json({ follow });
  } catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {token: token} */
// works from jobly to warbler

router.delete("/:username", authRequired, async function(req, res, next) {
  try {
    await Follow.unFollow(req.params.username, req.username);
    return res.status(201).json({ message: `You have unfollowed ${req.params.username}.` });
  } catch (e) {
    return next(e);
  }
});


module.exports = router;
