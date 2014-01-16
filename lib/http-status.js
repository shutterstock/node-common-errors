var util = require('util');

function HttpStatusError(message, statusCode) {
  this.message = message;
  this.name = "HttpStatusError";
  this.statusCode = this.status = statusCode || 500;
  Error.captureStackTrace(this, HttpStatusError);
  this.stack = "(" + this.statusCode + ") " + this.stack;

  return this;
}
util.inherits(HttpStatusError, Error);

module.exports = HttpStatusError;
