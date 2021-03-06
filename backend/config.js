/** Shared config for application; can be req'd many places. */


require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'warbler-test'
// - else: 'warbler'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "warblerJS-test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'warblerJS';
}

console.log("Using database", DB_URI);

module.exports = {
  SECRET,
  PORT,
  DB_URI,
};
