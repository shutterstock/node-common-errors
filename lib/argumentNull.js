var generateClass = require('./helpers/class-generator');
module.exports = generateClass("ArgumentNullError", {
  args: ['argumentName'],
  generateMessage: function(){
    return "Missing argument: " + this.argumentName;
  }
})
