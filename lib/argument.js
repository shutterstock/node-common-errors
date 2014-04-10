var util = require('util');

function ArgumentError(argumentName) {
  this.argumentName = argumentName;
  this.message = "Invalid or missing argument supplied: " + argumentName;
  this.name = "ArgumentError";
  Error.captureStackTrace(this, ArgumentError);
}
util.inherits(ArgumentError, Error);

module.exports = ArgumentError;
