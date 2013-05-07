module.exports = {
  Validation: require('./lib/validation'),
  Generic: require('./lib/generic'),
  HttpStatus: require('./lib/http-status'),
  Argument: require('./lib/argument'),
  ArgumentNull: require('./lib/argumentNull'),
  AlreadyInUse: require('./lib/alreadyInUse'),
  NotPermitted: require('./lib/notPermitted'),
  middleware: {
    errorHandler: require('./lib/middleware/errorHandler'),
    crashProtector: require('./lib/middleware/crashProtector')
  }
};

var logErrorDeprecationWarning = false;
module.exports.logError = function(err, cb) { 
  if(!logErrorDeprecationWarning) console.warn("logError is deprecated.  Use log instead.");
  logErrorDeprecationWarning = true;

  if(err && !err.isLogged) { 
    err.isLogged = true; 
    console.error(err); 
  } 
  if(cb) cb(err); 
};

module.exports.log = function(err, message) {
  if(typeof err == 'string') err = new module.exports.Generic(err);
  if(err) {
    message = message || "A generic error has occurred.";
    if(err.isLogged) err = new module.exports.Generic(message);
    else err = new module.exports.Generic(message, err);
    console.error(err);
    err.isLogged = true;
  }
  return err;
}
