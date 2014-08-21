var generateClass = require('./helpers/class-generator');
module.exports = generateClass("ValidationError", {
  args: ['message', 'code']
});