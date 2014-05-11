var support = require('./support');
support.testError('NotPermittedError', {
  message_to_assert: "An attempt was made to perform an operation that is invalid: test message"
});