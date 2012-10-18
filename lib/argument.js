var util = require('util');

function ArgumentError(argumentName) {
  this.argumentName = argumentName;
  this.message = "Invalid or missing argument supplied: " + argumentName;
  this.name = "ArgumentError";
  Error.captureStackTrace(this, ArgumentError);

  return this;
}
util.inherits(ArgumentError, Error);

module.exports = ArgumentError;
