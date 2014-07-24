var util = require('util');
var _ = require('lodash');
var key = "__COMMON-ERRORS-TYPES__";
var global_errors = global[key] = global[key] || {};

module.exports = function global_extend(Class) {
  Class.__original_prototype__ = Class.prototype;
  var global_class = global_errors[Class.name] = global_errors[Class.name] || Class;
  Class.prototype = Class.__global_prototype__ = global_class.prototype;
  Class.prototype.global_initialize = Class.prototype.global_initialize || function global_initialize(Class){
  	_.extend(this, Class.__original_prototype__);
  };
}