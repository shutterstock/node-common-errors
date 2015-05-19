var support = require('../support');
support.testError('RedisError', {
  full_name: 'data.RedisError',
  extends: require('../../lib/data/data')
});