module.exports = {
  Validation: require('./lib/validation'),
  Generic: require('./lib/generic'),
  HttpStatus: require('./lib/http-status'),
  Argument: require('./lib/argument'),
  middleware: {
    errorHandler: require('./lib/middleware/errorHandler'),
    crashProtector: require('./lib/middleware/crashProtector')
  }
};

module.exports.logError = function(err, cb) { 
  if(!err.isLogged) { 
    err.isLogged = true; 
    console.error(err); 
  } 
  if(cb) cb(err); 
};

