var support = require('./support');
support.testError('ArgumentNullError', {
  message: "arg1",
  message_to_assert: "Missing argument: arg1",
  extends: require('../lib/argument')
});