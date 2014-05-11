var support = require('../support');
support.testError('DirectoryNotFoundError', {
  full_name: 'io.DirectoryNotFoundError',
  extends: require('../../lib/io/io')
});