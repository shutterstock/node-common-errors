module.exports = require('./common');

module.exports.middleware = {
  errorHandler: require('./lib/middleware/errorHandler'),
  crashProtector: require('./lib/middleware/crashProtector')
};
