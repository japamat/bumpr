/** Routes for jobs. */

const express = require("express");
const router = express.Router({ mergeParams: true });

const { authRequired } = require("../middleware/auth");

const Job = require("../models/job");
const Company = require("../models/company");


/** GET / => {jobs: [job, ...]} */

router.get("/", authRequired, async function(req, res, next) {
  try {
    console.log('got here');
    console.log(req.query);
    
    const jobs = await Job.findAll(req.query, req.username);
    const companies = await Company.findAll(req.query);
    // console.log(res.json({jobs, companies}));
    
    return res.json({jobs, companies});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
