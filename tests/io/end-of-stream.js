var support = require('../support');
support.testError('EndOfStreamError', {
  full_name: 'io.EndOfStreamError',
  extends: require('../../lib/io/io')
});