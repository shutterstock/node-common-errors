var generateClass = require('./helpers/class-generator');
module.exports = generateClass("ArgumentError", {
  args: ['argumentName', 'inner_error'],
  generateMessage: function(){
    return "Invalid or missing argument supplied: " + this.argumentName;
  }
})
