var support = require('./support');
support.testError('NotFoundError', {
  message: "entity name",
  message_to_assert: 'Not Found: "entity name"'
});