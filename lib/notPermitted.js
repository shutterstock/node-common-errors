var util = require('util');

function NotPermittedError(message) {
  this.name = "NotPermittedError";
  this.message = "An attempt was made to perform an operation that is invalid: " + message;
  Error.captureStackTrace(this, NotPermittedError);

  return this;
}
util.inherits(NotPermittedError, Error);
module.exports = NotPermittedError;
