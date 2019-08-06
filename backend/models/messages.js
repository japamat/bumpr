const db = require("../db");

const BCRYPT_WORK_FACTOR = 10;


/** Related functions for users. */

class Message {
  /** Add a new message. Returns new user data. */

  static async add(data) {
    const result = await db.query(
      `INSERT INTO messages 
            (message, username) 
          VALUES ($1, $2) 
          RETURNING message, timestamp, username`,
      [data.message, data.username]);

    return result.rows[0];
  }

  /** Delete message. */

  static async remove(data) {
    const result = await db.query(
      `DELETE FROM messages WHERE id = $1`, [data]
    );
    return result.rows[0];
  }
}


module.exports = Message;
