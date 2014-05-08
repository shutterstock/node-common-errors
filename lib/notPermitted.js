var generateClass = require('./helpers/class-generator');
module.exports = generateClass("NotPermittedError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "An attempt was made to perform an operation that is invalid: " + this.message;
  }
})
