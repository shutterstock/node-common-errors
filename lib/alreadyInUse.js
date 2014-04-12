var generateClass = require('./helpers/class-generator');
module.exports = generateClass("AlreadyInUseError", {
  args: ['entity_name', 'arg1', 'arg2', 'arg3', 'arg4'],
  generateMessage: function(){
    var args = Array.prototype.slice.call(this.args, 1);
    return "The specified '" + this.entity_name + "' value is already in use for: " + args.join(', ');
  }
})
