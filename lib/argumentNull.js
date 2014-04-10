var util = require('util');

function ArgumentNullError(argumentName) {
  this.argumentName = argumentName;
  this.message = "Missing argument: " + argumentName;
  this.name = "ArgumentNullError";
  Error.captureStackTrace(this, ArgumentNullError);
}
util.inherits(ArgumentNullError, Error);

module.exports = ArgumentNullError;
