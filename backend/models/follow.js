const db = require("../db");

/** Related functions for users. */

class Follow {

  /** Find all followers. */

  static async findFollowers(username) {
    const result = await db.query(
      `SELECT f.follower AS username, u.bio, u.header_image_url, u.image_url
          FROM follows AS f
          JOIN users AS u ON f.followee = u.username
          WHERE followee = $1
          ORDER BY follower`, [username]
    );

    return result.rows;
  }

  /** Given a username, find all following. */

  static async findFollowing(username) {
    const result = await db.query(
      `SELECT f.followee AS username, u.bio, u.header_image_url, u.image_url
          FROM follows AS f
          JOIN users AS u ON f.follower = u.username
          WHERE follower = $1
          ORDER BY followee`, [username]
    );

    return result.rows;
  }

  /** Unfollow a given user */

  static async unFollow(followee, follower) {
    const result = await db.query(
      `DELETE FROM follows WHERE followee = $1 AND follower = $2`,
      [followee, follower]
    );
    return result;
  }

  /** Follow a given user */

  static async follow(followee, follower) {
    const result = await db.query(
      `INSERT INTO follows (followee, follower)
        VALUES ($1, $2) RETURNING followee, follower`,
      [followee, follower]
    );
    return result.rows[0];
  }
}


module.exports = Follow;
