var util = require('util');

function GenericError(message, innerError) {
  this.message = message;
  this.innerError = innerError;
  if(innerError) {
    Error.captureStackTrace(this, GenericError);
    this.stack = this.stack + '\n' + innerError.stack;
  }

  return this;
}
GenericError.prototype = new Error();
GenericError.prototype.constructor = GenericError; 
GenericError.prototype.name = "GenericError";

module.exports = GenericError;
