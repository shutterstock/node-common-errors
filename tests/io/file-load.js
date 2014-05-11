var support = require('../support');
support.testError('FileLoadError', {
  full_name: 'io.FileLoadError',
  extends: require('../../lib/io/io'),
  message_to_assert: "Unable to load file: test message"
});