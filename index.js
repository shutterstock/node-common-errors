module.exports = {
  Validation: require('./lib/validation'),
  Generic: require('./lib/generic'),
  HttpStatus: require('./lib/http-status'),
  NotSupported: require('./lib/not-supported'),
  Argument: require('./lib/argument'),
  ArgumentNull: require('./lib/argumentNull'),
  AlreadyInUse: require('./lib/alreadyInUse'),
  NotPermitted: require('./lib/notPermitted'),
  AuthenticationRequired: require('./lib/authenticationRequired'),
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
  if(typeof err == 'string') message = err, err = new module.exports.Generic(message);
  else if(err && !(err instanceof module.exports.Generic) || err.isLogged) {
    err = new module.exports.Generic(message || err.message || "A generic error has occurred.", err);
  }
  if(err) {
    console.error(err && err.stack || err);
    err.isLogged = true;
  }
  return err;
}
