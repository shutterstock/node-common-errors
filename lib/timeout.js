var generateClass = require('./helpers/class-generator');
module.exports = generateClass("TimeoutError", {
  args: ['time', 'inner_error'],
  generateMessage: function(){
  	if(/^\d/.test(this.time)) return "Timeout of '" + this.time + "' exceeded";
  	else return "Timeout exceeded: " + this.time;
  }
})
