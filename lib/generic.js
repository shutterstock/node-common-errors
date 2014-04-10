var util = require('util');

function GenericError(message, innerError) {
  this.message = message;
  this.innerError = innerError;
  Error.captureStackTrace(this, GenericError);
  if(innerError) {
    this.stack = this.stack + '\n' + innerError.stack;
  }
}
GenericError.prototype = new Error();
GenericError.prototype.constructor = GenericError; 
GenericError.prototype.name = "GenericError";

module.exports = GenericError;
