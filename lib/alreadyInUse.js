var util = require('util');

function AlreadyInUseError(entityName, arg1, arg2, arg3, arg4) {
  this.entityname = entityName;
  var args = [];
  for(var i=1; i<Object.keys(arguments).length; i++) {
    if(arguments.hasOwnProperty(i)) args.push(arguments[i]);
  }
  this.arguments = args;
  this.message = "The specified '" + entityName + "' value is already in use for: " + args.join(', ');
  this.name = "AlreadyInUseError";
  Error.captureStackTrace(this, AlreadyInUseError);
}
util.inherits(AlreadyInUseError, Error);

module.exports = AlreadyInUseError;
