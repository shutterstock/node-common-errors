var support = require('../support');
support.testError('FileNotFoundError', {
  full_name: 'io.FileNotFoundError',
  extends: require('../../lib/io/io'),
  message_to_assert: "File not found: test message"
});