var generateClass = require('./helpers/class-generator');
var ArgumentError = require('./argument');

var ValidationError = module.exports = generateClass("ValidationError", {
  args: ['message', 'code', 'field']
});

ValidationError.prototype.addError = function addError(error) {
  this.errors = this.errors || [];
  this.errors.push(error);
  return this;
}

ValidationError.prototype.addErrors = function addErrors(errors) {
  if(!(errors instanceof Array)) throw new ArgumentError("errors");
  
  this.errors = this.errors || [];
  Array.prototype.push.apply(this.errors, errors);
  return this;
}

ValidationError.prototype.generateMessage = function generateMessage(){
  return this.message || "Validation failed.";
}

ValidationError.prototype.toJSON = function toJSON(){
  var o = {};
  if(this.errors) {
    if(this.message) o.message = this.message;
    o.errors = this.errors.map(function(error){
      return error.toJSON();
    });
  } else {
    if(this.message) o.text = this.message;
    if(this.code) o.code = this.code;
    if(this.field) o.field = this.field;    
  }
  return o;
}