const express = require('express');
const jsonschema = require('jsonschema');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

const sloganSchema = require('./schema/sloganSchema.json');
const ExpressError = require('./errors/expressError');
let slogans = require('./data/defaultSlogans.json');

const router = new express.Router();

/**
 * Route to retrieve all the books from defaultItems.json.
 * Does not need to be asynchronous for this usecase.
 * GET / =>
 *    {slogans: [
 *      {
 *        id: "acd3721c-1908-4943-856c-8e049d2ac0a3",
 *        text: "transition ubiquitous methodologies"
 *      }
 *    ]}
 */

router.get('/', (req, res, next) => {
  try {
    return res.json({ slogans });
  } catch (error) {
    return next(error);
  }
});

/**
 * This function does not need to be asynchronous for this usecase,
 * using fs.writeFileSync to ensure synchronous file writing
 *
 *  POST / =>
 *    {slogan: {
 *        text: "transition ubiquitous methodologies"
 *      }
 *    }
 */

router.post('/', (req, res, next) => {
  try {
    const { slogan } = req.body;
    const result = jsonschema.validate(slogan, sloganSchema);
    if (!result.valid) {
      const listOfErrors = result.errors.map(error => error.stack);
      const error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    slogan.id = uuidv4();
    slogans = [slogan, ...slogans];
    fs.writeFileSync(
      `${__dirname}/data/defaultSlogans.json`,
      JSON.stringify(slogans, null, 2),
      error => {
        throw new ExpressError(error, 500);
      },
    );
    return res.status(201).json({ slogan });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
