var util = require('util');

function NotSupportedError(message) {
  this.message = "Not Supported: " + message;
  this.name = "NotSupportedError";
  Error.captureStackTrace(this, NotSupportedError);

  return this;
}
util.inherits(NotSupportedError, Error);

module.exports = NotSupportedError;
