var generateClass = require('./helpers/class-generator');
module.exports = generateClass("ArgumentNullError", {
  args: ['argumentName', 'inner_error'],
  extends: require('./argument'),
  generateMessage: function(){
    return "Missing argument: " + this.argumentName;
  }
})
