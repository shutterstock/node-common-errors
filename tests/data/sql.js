var support = require('../support');
support.testError('SQLError', {
  full_name: 'data.SQLError',
  extends: require('../../lib/data/data')
});