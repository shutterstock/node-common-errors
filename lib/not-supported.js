var generateClass = require('./helpers/class-generator');
module.exports = generateClass("NotSupportedError", {
  args: ['message'],
  generateMessage: function(){
    return "Not Supported: " + this.message;
  }
})
