var support = require('../support');
support.testError('MemcachedError', {
  full_name: 'data.MemcachedError',
  extends: require('../../lib/data/data')
});