const db = require("../db");

/** Related functions for Comments. */

class Comment {

  /** Comment a message. */

  static async addComment(messageId, username, comment) {
    const result = await db.query(
      `INSERT INTO comments (message_id, username, comment)
          VALUES ($1, $2, $3)
          RETURNING message_id, username, comment, id`,
      [messageId, username, comment]
    );
    return result.rows[0];
  }

  /** UnComment a message. */

  static async deleteComment(commentId, messageId) {
    const result = await db.query(
      `DELETE FROM comments WHERE id = $1 AND message_id = $2`,
      [commentId, messageId]
    );
    return result;
  }

  /** Edit a comment. */

  static async editComment(commentId, comment) {
    const result = await db.query(
      `UPDATE comments
          SET comment = $1
          WHERE id = $2
          RETURNING comment, id, username, message_id`,
      [comment, commentId]
    );
    return result.rows[0];
  }

  /** Get the commenter username for a given comment */

  static async getUsername(commentId) {
    const result = await db.query(`
      SELECT username FROM comments WHERE id = $1`, [commentId]
    );
    return result.rows[0].username;
  }
}


module.exports = Comment;
