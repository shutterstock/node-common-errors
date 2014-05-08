var generateClass = require('./helpers/class-generator');
module.exports = generateClass("ArgumentNullError", {
  args: ['argumentName', 'inner_error'],
  generateMessage: function(){
    return "Missing argument: " + this.argumentName;
  }
})
