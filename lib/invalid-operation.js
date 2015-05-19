var generateClass = require('./helpers/class-generator');
module.exports = generateClass("InvalidOperationError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "Invalid Operation: " + this.message;
  }
})
