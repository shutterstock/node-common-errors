var http = require('http');
var util = require('util');

var STATUS_CODE_ATTRIBUTE_NAME = module.exports.STATUS_CODE_ATTRIBUTE_NAME = 'status';

var HttpStatusError = module.exports = function HttpStatusError(status_code, message) {
  if(!(this instanceof HttpStatusError)) {
    var instance = Object.create(HttpStatusError.prototype);
    HttpStatusError.apply(instance, arguments);
    return instance;
  }

  if(typeof message == 'number' && typeof status_code != 'number') {
    //old interface, so swap.
    var c = message;
    message = status_code;
    status_code = c;
  } else if(status_code instanceof Error) {
    var err = status_code;
    var req = message;
    status_code = err[STATUS_CODE_ATTRIBUTE_NAME];
    if(typeof status_code != "number") {
      status_code = code_map[err.name];
      if(typeof status_code == "function") {
        status_code(err, req);
        status_code = err.status_code;
      }
      status_code = status_code || 500;
    } 
    message = err.message;
    this.stack = err.stack;
  }

  this.status_code = this.statusCode = this[STATUS_CODE_ATTRIBUTE_NAME] = status_code || 500;
  this.name = "HttpStatusError";

  var http_message = "(" + this.status_code + ") " + message_map[status_code] || message_map[status_code >= 500 ? 500 : 400];
  this.message = message || http_message;
  if(!this.stack) Error.captureStackTrace(this, HttpStatusError);
  if(message) this.stack = http_message + "\n" + this.stack;
}
util.inherits(HttpStatusError, Error);

var code_map = HttpStatusError.code_map = {
  "ValidationError": 400,
  "ArgumentError": 400,
  "AuthenticationRequiredError": 401,
  "NotPermittedError": 403,
  "ArgumentNullError": function(err, req){
    var method = req && req.method || 'GET';
    var params = req && req.params || {};
    var route_path = req && req.route && req.route.path || '';

    if(/GET|HEAD/i.test(method) || params.hasOwnProperty(err.argumentName) || new RegExp(":" + err.argumentName + '').test(route_path + '/')) err.status_code = 404;
    else err.status_code = 400;
    err.message = err.message.replace(new RegExp("^Missing argument: (" + err.argumentName + ")$"), 'Not Found: "$1"' );
  },
  "NotFoundError": 404,
  "NotSupportedError": 405,
  "AlreadyInUseError": 409,
};

var codes = {};
Object.keys(http.STATUS_CODES).forEach(function(key){
  codes[key] = http.STATUS_CODES[key];
});
var message_map = HttpStatusError.message_map = codes;