var util = require('util');

function ValidationError(message, code) {
  this.name = "ValidationError";
  this.message = message || '';
  this.code = code;

  this.toString = function(){
    return this.message;
  }
}
util.inherits(ValidationError, Error);
module.exports = ValidationError;


