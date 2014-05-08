var util = require('util');

var classGenerator = require('./lib/helpers/class-generator');

module.exports = {
    Error: classGenerator('Error'),
    ReferenceError: classGenerator('ReferenceError', {subclass: ReferenceError}),
    Validation: require('./lib/validation'),
    Generic: require('./lib/generic'),
    HttpStatus: require('./lib/http-status'),
    NotSupported: require('./lib/not-supported'),
    Argument: require('./lib/argument'),
    ArgumentNull: require('./lib/argumentNull'),
    AlreadyInUse: require('./lib/alreadyInUse'),
    NotPermitted: require('./lib/notPermitted'),
    AuthenticationRequired: require('./lib/authenticationRequired'),
    helpers: {
      generateClass: classGenerator
    },
    middleware: {
      errorHandler: require('./lib/middleware/errorHandler'),
      crashProtector: require('./lib/middleware/crashProtector')
    }
};

var logErrorDeprecationWarning = false;
module.exports.logError = function(err, cb) {
    if (!logErrorDeprecationWarning) console.warn("logError is deprecated.  Use log instead.");
    logErrorDeprecationWarning = true;

    if (err && !err.isLogged) {
        err.isLogged = true;
        console.error(err);
    }
    if (cb) cb(err);
};

module.exports.log = function(err, message) {
    if (typeof err == 'string') {
        err = new module.exports.Generic(err);
    } else {
        if (message) {
            err.message = message;
        }
        err = module.exports._prependCurrentStack(err);
    }
    if (err) {
        console.error(err && err.stack || err);
        err.isLogged = true;
    }
    return err;
}

module.exports._prependCurrentStack = function(err) {
    // skip the first three lines, because they're just noise
    var stackToPrepend = (new Error()).stack.split("\n").slice(3);
    var mainStack = err.stack.split("\n");
    var errTitle = mainStack.shift();
    err.stack = [errTitle].concat(stackToPrepend, "====", mainStack).join("\n");
    return err;
};
