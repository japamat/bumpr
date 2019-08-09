/** extends the normal JS error
 * Can add a custom status when thrown.
 *
 *  Returned by error-handling middleware.
 */

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = ExpressError;
