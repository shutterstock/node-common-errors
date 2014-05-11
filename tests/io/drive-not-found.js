var support = require('../support');
support.testError('DriveNotFoundError', {
  full_name: 'io.DriveNotFoundError',
  extends: require('../../lib/io/io')
});