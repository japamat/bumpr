const { Client } = require("pg");
const { DB_URI } = require("./config");

const userJSON = require('./seedData/users.json');
const messagesJSON = require('./seedData/messages.json');
const followsJSON = require('./seedData/follows.json');
const commentsJSON = require('./seedData/comments.json');
const likesJSON = require('./seedData/likes.json');

const client = new Client({
  connectionString: DB_URI
});

client.connect();

// Remove existing relations
// (async () => {
//   await client.query(`DROP SCHEMA public CASCADE`);
//   await client.query(`CREATE SCHEMA public`);
// })();

// Create tables
// (async () => {
//   await client.query(`CREATE TABLE users (username TEXT PRIMARY KEY, email TEXT NOT NULL, image_url TEXT DEFAULT 'https://cdn5.vectorstock.com/i/thumb-large/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg', bio TEXT, header_image_url TEXT, location TEXT, password TEXT NOT NULL)`);
  
//   await client.query(`CREATE TABLE messages(id SERIAL PRIMARY KEY, message TEXT, username TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, rewarble INTEGER DEFAULT NULL)`);
  
//   await client.query(`CREATE TABLE comments(id SERIAL PRIMARY KEY, comment TEXT, username TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, message_id INTEGER NOT NULL)`);
  
//   await client.query(`CREATE TABLE likes(id SERIAL PRIMARY KEY, username TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, message_id INTEGER NOT NULL)`);
  
//   await client.query(`CREATE TABLE follows (followee TEXT NOT NULL, follower TEXT NOT NULL);`);
// })();

// Add foreign keys
// (async () => {
//   await client.query(`ALTER TABLE messages ADD FOREIGN KEY (username) REFERENCES users (username)`);
//   await client.query(`ALTER TABLE follows ADD FOREIGN KEY (followee) REFERENCES users (username)`);
//   await client.query(`ALTER TABLE follows ADD FOREIGN KEY (follower) REFERENCES users (username)`);
//   await client.query(`ALTER TABLE comments ADD FOREIGN KEY (message_id) REFERENCES messages (id)`);
//   await client.query(`ALTER TABLE likes ADD FOREIGN KEY (message_id) REFERENCES messages (id)`);
// })();


// add users to db
// userJSON.forEach(async user => {
//   await client.query(`INSERT INTO users (username, password, email, image_url, bio, location, header_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [user.username, user.password, user.email, user.image_url, user.bio, user.location, user.header_image_url]);
// });
// console.log('finished inserting into users');

// add messages to db
// messagesJSON.forEach(async (message, i) => {
//   await client.query(`INSERT INTO messages (username, message, timestamp) VALUES ($1, $2, $3)`, [message.username, message.text, message.timestamp]);
// });
// console.log('finished inserting into messages');

// add comments to db
// commentsJSON.forEach(async (comment, i) => {
//   await client.query(`INSERT INTO comments (username, comment, message_id) VALUES ($1, $2, $3)`, [comment.username, comment.comment, comment.message_id]);
// });
// console.log('finished inserting into comments');

// add likes to db
// likesJSON.forEach(async (like, i) => {
//   await client.query(`INSERT INTO likes (username, message_id) VALUES ($1, $2)`, [like.username, like.message_id]);
// });
// console.log('finished inserting into likes');

// add follows to db
// followsJSON.forEach(async follow => {
//   await client.query(`INSERT INTO follows (followee, follower) VALUES ($1, $2)`, [follow.followee, follow.follower]);
// });
// console.log('finished inserting into follows');


