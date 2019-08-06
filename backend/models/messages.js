const db = require("../db");

/** Related functions for messages. */

class Message {
  /** Add a new message. Returns new user data. */

  static async add(data) {
    const result = await db.query(
      `INSERT INTO messages 
            (message, username) 
          VALUES ($1, $2) 
          RETURNING message, timestamp, username, id`,
      [data.message, data.username]);

    return result.rows[0];
  }

  /** Delete message. */

  static async remove(data) {
    const result = await db.query(
      `DELETE FROM messages WHERE id = $1`, [data]
    );
    return result;
  }

  /** Update message */

  static async edit(id, message) {
    const result = await db.query(
      `UPDATE messages SET message = $1 WHERE id = $2 RETURNING message, id, timestamp, username`, [message, id]
    );
    return result.rows[0];
  }

  /** Find specific message */

  static async findOne(id) {
    const result = await db.query(
      `SELECT * FROM MESSAGES WHERE id = $1`, [id]
    );
    return result.rows[0];
  }

  /** Get new messages */

  static async findNew(offset, limit) {
    // set defaults if params not passed
    if (isNaN(+offset)) offset = 0;
    if (isNaN(+limit)) limit = 20;
    const result = await db.query(
      `SELECT * FROM MESSAGES ORDER BY timestamp DESC LIMIT $1 OFFSET $2`, [limit, offset]
    );
    return result.rows;
  }
}

module.exports = Message;
