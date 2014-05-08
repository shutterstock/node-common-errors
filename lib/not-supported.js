var generateClass = require('./helpers/class-generator');
module.exports = generateClass("NotSupportedError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "Not Supported: " + this.message;
  }
})
