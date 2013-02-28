module.exports = function errorHandler(err, req, res, next){
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

  var statusCode = err.name == "HttpStatusError" ? err.statusCode : err.status || 500;
  var message = err.message || defaultMessages[statusCode];

  if (statusCode >= 500) {
    message = defaultMessages[500];
    console.error(err.stack);
  }

  if (!message) {
    message = defaultMessages[400];
  }

  res.send(statusCode, message);
}
