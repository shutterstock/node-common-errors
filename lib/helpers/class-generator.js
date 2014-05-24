var util = require('util');
var globalize = require('../internal/globalize');

module.exports = function generateErrorClass(name, options){
  options = options || {};
  if(options.subclass) console.warn("options.subclass is deprecated. use options.extends instead.");
  options.extends = options.extends || options.subclass || Error;
  options.args = options.args || ['message', 'inner_error'];
  options.generateMessage = options.generateMessage || null;

  validateInput(name);
  validateArrayInput(options.args);

  var classConstructor = function classConstructor(){
    Class.super_.call(this);
    this.args = arguments;
    for(var i = 0; i<options.args.length; i++){
      this[options.args[i]] = arguments[i];
    }
    this.name = name;
    if(this.generateMessage) this.message = this.generateMessage();
    Class.captureStackTrace(this, Class);
  };

  var classGeneratorFn = new Function('classConstructor',
    "return function " + name + "(" + options.args.join(', ') + "){ classConstructor.apply(this, arguments); };"
  );
  var Class = classGeneratorFn(classConstructor);
  globalize(Class, options.extends);

  Class.prototype.generateMessage = options.generateMessage;

  Class.captureStackTrace = function captureStackTrace(error, error_class){
    Error.captureStackTrace(error, error_class);
    if(error.inner_error && error.inner_error.stack) error.stack += "\n--- inner error ---\n" + error.inner_error.stack;
  }

  return Class;
}

var validateInput = function validateInput(str){
  if(typeof str != 'string' || !/^[\-\w]+$/.test(str)) throw new Error("Unsafe or invalid string '" + (str || '').toString() + "' used to generate Error class.");
}
var validateArrayInput = function validateArrayInput(array){
  if(!array || !Array.isArray(array)) throw new Error("Unsafe or invalid args used to generate Error class.");
  for(var i = 0; i<array.length; i++) validateInput(array[i]);
}