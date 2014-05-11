var support = require('./support');
support.testError('AuthenticationRequiredError', {
  message: "password is incorrect",
  message_to_assert: "An attempt was made to perform an operation without authentication: password is incorrect"
});