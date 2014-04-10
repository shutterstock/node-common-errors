var util = require('util');

function NotSupportedError(message) {
  this.message = "Not Supported: " + message;
  this.name = "NotSupportedError";
  Error.captureStackTrace(this, NotSupportedError);
}
util.inherits(NotSupportedError, Error);

module.exports = NotSupportedError;
