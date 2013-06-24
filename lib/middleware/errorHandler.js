module.exports = function errorHandler(err, req, res, next){
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
  if(err.status) statusCode = err.status;
  else if(err.name == "ArgumentNullError") { statusCode = 404; message = 'Not Found: "' + err.argumentName + '"'; }
  else if(err.name == "NotPermittedError") statusCode = 403;
  else if(err.name == "AlreadyInUseError") statusCode = 409;
  else if(err.name == "ValidationError") statusCode = 400;
  else if(err.name == "HttpStatusError") statusCode = err.statusCode;
  else statusCode = 500;

  message = message || err.message || defaultMessages[statusCode];

  if (statusCode >= 500) {
    message = defaultMessages[500];
    console.error(err.stack);
  }

  if (!message) {
    message = defaultMessages[400];
  }

  res.send(statusCode, message);
}
