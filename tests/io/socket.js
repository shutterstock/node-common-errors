var support = require('../support');
support.testError('SocketError', {
  full_name: 'io.SocketError',
  extends: require('../../lib/io/io')
});