var support = require('./support');
support.testError('ArgumentError', {
  message: "arg1",
  message_to_assert: "Invalid or missing argument supplied: arg1"
});