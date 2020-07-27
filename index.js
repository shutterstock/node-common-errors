
var exports = module.exports = {
  helpers: {
    generateClass: require('./lib/helpers/class-generator')
  },
  middleware: {
    errorHandler: require('./lib/middleware/errorHandler'),
  }
};

exports.AlreadyInUseError = exports.AlreadyInUse = require('./lib/alreadyInUse');
exports.ArgumentError = exports.Argument = require('./lib/argument');
exports.ArgumentNullError = exports.ArgumentNull = require('./lib/argumentNull');
exports.AuthenticationRequiredError = exports.AuthenticationRequired = require('./lib/authenticationRequired');
exports.ConnectionError = exports.helpers.generateClass('ConnectionError');
exports.Error = exports.helpers.generateClass('Error');
exports.HttpStatusError = exports.HttpStatus = require('./lib/http-status');
exports.InvalidOperationError = require('./lib/invalid-operation');
exports.NotFoundError = require('./lib/not-found');
exports.NotImplementedError = exports.helpers.generateClass('NotImplementedError'),
exports.NotSupportedError = exports.NotSupported = require('./lib/not-supported');
exports.NotPermittedError = exports.NotPermitted = require('./lib/notPermitted');
exports.OutOfMemoryError = exports.helpers.generateClass('OutOfMemoryError');
exports.RangeError = exports.helpers.generateClass('RangeError', { extends: RangeError });
exports.ReferenceError = exports.helpers.generateClass('ReferenceError', { extends: ReferenceError });
exports.StackOverflowError = exports.helpers.generateClass('StackOverflowError');
exports.SyntaxError = exports.helpers.generateClass('SyntaxError', { extends: SyntaxError });
exports.TimeoutError = require('./lib/timeout.js')
exports.TypeError = exports.helpers.generateClass('TypeError', { extends: TypeError });
exports.URIError = exports.helpers.generateClass('URIError', { extends: URIError });
exports.ValidationError = exports.Validation = require('./lib/validation');

exports.io = {
  IOError: require('./lib/io/io')
};
exports.io.DirectoryNotFoundError = exports.helpers.generateClass('DirectoryNotFoundError', { extends: exports.io.IOError });
exports.io.DriveNotFoundError = exports.helpers.generateClass('DriveNotFoundError', { extends: exports.io.IOError });
exports.io.EndOfStreamError = exports.helpers.generateClass('EndOfStreamError', { extends: exports.io.IOError });
exports.io.FileLoadError = require('./lib/io/file-load');
exports.io.FileNotFoundError = require('./lib/io/file-not-found');
exports.io.SocketError = exports.helpers.generateClass('SocketError', { extends: exports.io.IOError });

exports.data = {
  DataError: require('./lib/data/data')
};
exports.data.MemcachedError = exports.helpers.generateClass('MemcachedError', { extends: exports.data.DataError });
exports.data.MongoDBError = exports.helpers.generateClass('MongoDBError', { extends: exports.data.DataError });
exports.data.RedisError = exports.helpers.generateClass('RedisError', { extends: exports.data.DataError });
exports.data.RollbackError = exports.helpers.generateClass('RollbackError', { extends: exports.data.DataError });
exports.data.SQLError = exports.helpers.generateClass('SQLError', { extends: exports.data.DataError });
exports.data.TransactionError = exports.helpers.generateClass('TransactionError', { extends: exports.data.DataError });



exports.Generic = exports.helpers.generateClass('GenericError'); //deprecated


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
    err = new module.exports.Error(err);
  } else {
    if (message) {
      err.message = message;
    }
    err = module.exports.prependCurrentStack(err, 3);
  }
  if (err) {
    console.error(err && err.stack || err);
    err.isLogged = true;
  }
  return err;
}

module.exports.prependCurrentStack = function(err, offset_) {
  var linesToSkip = (typeof offset_ === 'undefined') ? 2 : offset_;
  var stackToPrepend = (new Error()).stack.split("\n").slice(linesToSkip);
  var mainStack = (err.stack || '').split("\n");
  var errTitle = mainStack.shift();
  err.stack = [errTitle].concat(stackToPrepend, "====", mainStack).join("\n");
  return err;
};
