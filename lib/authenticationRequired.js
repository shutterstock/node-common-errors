var generateClass = require('./helpers/class-generator');
module.exports = generateClass("AuthenticationRequiredError", {
  args: ['message'],
  generateMessage: function(){
    return "An attempt was made to perform an operation without authentication: " + this.message;
  }
})
