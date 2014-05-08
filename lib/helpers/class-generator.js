var util = require('util');

module.exports = function generateErrorClass(name, options){
  options = options || {};
  options.subclass = options.subclass || Error;
  options.args = options.args || ['message', 'inner_error'];
  options.generateMessage = options.generateMessage || null;

  var Class = eval("var Class = function " + name + "(" + options.args.join(', ') + "){ classConstructor.apply(this, arguments); }; Class;");
  var classConstructor = function classConstructor(){
    Class.super_.call(this);
    this.args = arguments;
    for(var i = 0; i<options.args.length; i++){
      this[options.args[i]] = arguments[i];
    }
    this.name = name;
    if(this.generateMessage) this.message = this.generateMessage();
    this.captureStackTrace();
  }
  util.inherits(Class, options.subclass);

  Class.prototype.generateMessage = options.generateMessage;
  Class.prototype.captureStackTrace = function captureStackTrace(){
    Error.captureStackTrace(this, Class);
    if(this.inner_error && this.inner_error.stack) this.stack += "\n--- inner error ---\n" + this.inner_error.stack;
  }

  return Class;
}
