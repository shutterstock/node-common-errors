var support = require('../support');
support.testError('MongoDBError', {
  full_name: 'data.MongoDBError',
  extends: require('../../lib/data/data')
});