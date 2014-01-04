var util = require('util');

function AuthenticationRequiredError(message) {
  this.name = "AuthenticationRequiredError";
  this.message = "An attempt was made to perform an operation without authentication: " + message;
  Error.captureStackTrace(this, AuthenticationRequiredError);

  return this;
}
util.inherits(AuthenticationRequiredError, Error);
module.exports = AuthenticationRequiredError;

