const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");

const BCRYPT_WORK_FACTOR = 10;


/** Related functions for users. */

class User {

  /** authenticate user with username, password. Returns user or throws err. */

  static async authenticate(data) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, 
                password
          FROM users 
          WHERE username = $1`,
      [data.username]
    );
    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }

    const invalidPass = new Error("Invalid Credentials");
    invalidPass.status = 401;
    throw invalidPass;
  }

  /** Get data for the current logged in user */

  static async findMe(username) {
    const user = {};
    const userRes = await db.query(
      `SELECT
          u.bio,
          u.location,
          u.header_image_url,
          u.username,
          u.image_url,
          COUNT(DISTINCT flr.followee) as following,
          COUNT(DISTINCT fle.follower) as followers
        FROM users AS u
          JOIN follows AS flr ON flr.follower = u.username
          JOIN follows AS fle ON fle.followee = u.username
        WHERE username = $1
        GROUP BY (u.bio, u.username, u.location, u.image_url)`, [username]
    );
    user.about = userRes.rows[0];
    return user;
  }


  /** Register user with data. Returns new user data. */

  static async register(data) {
    // add json validation here
    const duplicateCheck = await db.query(
      `SELECT username 
            FROM users 
            WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) {
      const err = new Error(
        `There already exists a user with username '${data.username}`);
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const reqObj = Object.entries(data)
      .filter(entry => entry[1].length)
      .reduce((acc, entry, i) => {
        acc.columns = [...acc.columns, entry[0]];
        acc.values = [...acc.values, entry[0] === 'password' ? hashedPassword : entry[1]];
        acc.ref = [...acc.ref, `$${i + 1}`];
        return acc;
      }, {columns: [], values: [], ref: []});

    const result = await db.query(
      `INSERT INTO users 
            (${reqObj.columns.join(', ')}) 
          VALUES (${reqObj.ref.join(', ')}) 
          RETURNING username, password, image_url, bio, email, location, header_image_url`,
      reqObj.values);

    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
      `SELECT username, bio, location, image_url, header_image_url, location
          FROM users
          ORDER BY username`);

    return result.rows;
  }

  /** get user data for feed/home */

  static async getFeed(username, offset) {
    const user = {};
    const userFollowing = 
      `SELECT followee FROM follows WHERE follower = $1`;

    let feedRes = await db.query(
      `SELECT
          m.id,
          m.timestamp,
          m.rebumps AS num_rebumps,
          m.comments AS num_comments,
          m.likes AS num_likes,
          BOOL_OR(f.follower = $1) AS direct_follow,
          m.rebumps AS num_rebumps,
          array_agg(DISTINCT l.username) likes,
          array_agg(DISTINCT ARRAY[r.username, r.text]) rebumps,
          m.message,
          m.username,
          u.image_url
        FROM messages AS m
          JOIN users AS u ON u.username = m.username
          FULL JOIN rebump AS r ON m.id = r.message_id
          FULL JOIN likes AS l ON l.message_id = m.id
          FULL JOIN comments AS c ON c.message_id = m.id
          FULL JOIN follows AS f ON m.username = f.followee
        WHERE m.username IN (${userFollowing})
          OR r.username IN (${userFollowing})
        GROUP BY (m.id, u.username) ORDER BY m.timestamp DESC
        LIMIT 30 OFFSET $2`,
      [username, offset]
    );

    user.feed = feedRes.rows;
    return user;
  }

  /** Given a username, return data about user. */

  static async findOne(username, offset) {
    const userRes = await db.query(
      `SELECT username, bio, image_url, header_image_url, location 
            FROM users 
            WHERE username = $1`,
      [username]);
    const user = userRes.rows[0];


    if (!user) {
      const error = new Error(`There exists no user '${username}'`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    const userMessagesRes = await db.query(
      `SELECT
          m.id,
          m.timestamp,
          m.rebumps AS num_rebumps,
          m.comments AS num_comments,
          m.likes AS num_likes,
          BOOL_OR(f.follower = $1) AS direct_follow,
          m.rebumps AS num_rebumps,
          array_agg(DISTINCT l.username) likes,
          array_agg(DISTINCT ARRAY[r.username, r.text]) rebumps,
          m.message,
          m.username,
          u.image_url
        FROM messages AS m
          JOIN users AS u ON u.username = m.username
          FULL JOIN rebump AS r ON m.id = r.message_id
          FULL JOIN likes AS l ON l.message_id = m.id
          FULL JOIN comments AS c ON c.message_id = m.id
          FULL JOIN follows AS f ON m.username = f.followee
        WHERE m.username = $1 OR r.username =$1
        GROUP BY (m.id, u.username) ORDER BY m.timestamp DESC
        LIMIT 30 OFFSET $2`,
      [username, offset]
    );

    const userFollowsRes = await db.query(
      `SELECT count(followee)
        FROM follows     
        WHERE follower = $1`,
      [username]);
    
    const userFollowersRes = await db.query(
      `SELECT count(follower)
        FROM follows     
        WHERE followee = $1`,
      [username]);

    user.following = userFollowsRes.rows[0].count;
    user.followers = userFollowersRes.rows[0].count;
    user.messages = userMessagesRes.rows;
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  //  works from jobly to warbler

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = partialUpdate(
      "users",
      data,
      "username",
      username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      let notFound = new Error(`There exists no user '${username}`);
      notFound.status = 404;
      throw notFound;
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0];
  }

  /** Delete given user from database; returns undefined. */
  // works from jobly to warbler

  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users 
                WHERE username = $1
                RETURNING username`,
      [username]);

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no user '${username}'`);
      notFound.status = 404;
      throw notFound;
    }
  }
}


module.exports = User;
