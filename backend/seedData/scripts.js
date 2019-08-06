const fs = require('fs');

const userJSON = require('./users.json');
const commentsJSON = require('./follows.json');
const likesJSON = require('./likes.json');

const getRandom = (table, column) => {
  return table[Math.floor(Math.random() * table.length)][column];
};

let comments = commentsJSON.slice(0, 1000);

(() => {
  comments.forEach((comment, i) => {
    comment.message_id = Math.floor(Math.random() * 1000) + 1;
    comment.username = getRandom(userJSON, 'username');
    delete comment.followee;
    delete comment.follower;
  });
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  
})();

(() => {
  likesJSON.forEach(like => {
    like.message_id = Math.floor(Math.random() * 1000) + 1;
    like.username = getRandom(userJSON, 'username');
    delete like.followee;
    delete like.follower;
  });
  fs.writeFileSync('./likes.json', JSON.stringify(likesJSON, null, 2));
})();


