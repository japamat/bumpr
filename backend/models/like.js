const db = require("../db");

/** Related functions for likes. */

class Like {

  /** like a message. */

  static async likeMessage(messageId, username) {
    const result = await db.query(
      `INSERT INTO likes (message_id, username)
          VALUES ($1, $2)
          RETURNING message_id, username`,
      [messageId, username]
    );
    return result.rows[0];
  }

  /** Unlike a message. */

  static async unlikeMessage(messageId, username) {
    const result = await db.query(
      `DELETE FROM likes WHERE message_id = $1 AND username = $2`,
      [messageId, username]
    );
    return result;
  }
}


module.exports = Like;
