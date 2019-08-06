/** Routes for jobs. */

const express = require("express");
const router = express.Router({ mergeParams: true });

const { authRequired } = require("../middleware/auth");

const Job = require("../models/job");
const Company = require("../models/company");


/** GET / => {jobs: [job, ...]} */

router.get("/", authRequired, async function(req, res, next) {
  try {
    const jobs = await Job.findAll(req.query, req.username);
    const companies = await Company.findAll(req.query);
    
    return res.json({jobs, companies});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
