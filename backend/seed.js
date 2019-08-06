const db = require("./db");

const userJSON = require('./seedData/users.json');
const messagesJSON = require('./seedData/messages.json');
const followsJSON = require('./seedData/follows.json');

// add users to db
userJSON.forEach(async user => {
  await db.query(`INSERT INTO users (username, password, email, image_url, bio, location, header_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [user.username, user.password, user.email, user.image_url, user.bio, user.location, user.header_image_url]);
});
console.log('finished inserting into users');

messagesJSON.forEach(async (message, i) => {
  console.log(`******************************\n${i}\n******************************`)
  await db.query(`INSERT INTO messages (username, message, timestamp) VALUES ($1, $2, $3)`, [message.username, message.text, message.timestamp]);
});
console.log('finished inserting into messages');

followsJSON.forEach(async follow => {
  await db.query(`INSERT INTO follows (followee, follower) VALUES ($1, $2)`, [follow.followee, follow.follower]);
});
console.log('finished inserting into follows');

