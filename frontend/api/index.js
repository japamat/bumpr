const express = require('express');
const sloganRouter = require('./slogans');

const router = express.Router();

router.use('/slogans', sloganRouter);

module.exports = router;
