var util = require('util');

module.exports = function generateErrorClass(name, options){
  options = options || {};
  options.subclass = options.subclass || Error;
  options.args = options.args || ['message'];
  options.generateMessage = options.generateMessage || null;

  var Class = function(){
    Class.super_.call(this);
    this.args = arguments;
    for(var i = 0; i<options.args.length; i++){
      this[options.args[i]] = arguments[i];
    }
    this.name = name;
    if(options.generateMessage) this.message = options.generateMessage.call(this);
    Error.captureStackTrace(this, Class);
  }
  Class.prototype.generateMessage = options.generateMessage;
  util.inherits(Class, options.subclass);

  return Class;
}
