module.exports = function errorHandlerFactory(callback) {
  return function errorHandler(err, req, res, next){
    if(!err) {
      if(next) return next();
      else return res.end();
    }

    var defaultMessages = {
      400: "Bad Request!",
      401: "Authorization Required!",
      403: "Forbidden!",
      405: "Method not allowed!",
      406: "Response Type Not Acceptable!",
      408: "Request Timeout!",
      409: "Conflict!",
      412: "Precondition Failed!",
      500: "Internal Server Error!"
    }

    var statusCode, message;
    if(err.name == "ArgumentNullError") { 
      if(/GET|HEAD/i.test(req.method) || req.params.hasOwnProperty(err.argumentName)) statusCode = 404;
      else statusCode = 400;
      message = err.message.replace(new RegExp("^Missing argument: (" + err.argumentName + ")$"), 'Not Found: "$1"' )
    } else if(err.name == "NotPermittedError") statusCode = 403;
    else if(err.name == "AlreadyInUseError") statusCode = 409;
    else if(err.name == "ValidationError") statusCode = 400;
    else if(err.name == "AuthenticationRequiredError") statusCode = 401;
    else if(err.name == "HttpStatusError") statusCode = err.statusCode;
    else statusCode = 500;

    if(err.status) statusCode = err.status;

    message = message || err.message || defaultMessages[statusCode];

    if (statusCode >= 500) {
      message = defaultMessages[500];
      console.error(err.stack);
    }

    if (!message) {
      message = defaultMessages[400];
    }

    if (callback) {
      return callback(statusCode, message, err, req, res, next);
    } else {
      return res.send(statusCode, message);
    }
  }
}
