var util = require('util');
var key = "__COMMON-ERRORS-TYPES__";
var global_errors = global[key] = global[key] || {};

module.exports = function global_extend(Class) {
  Class.__original_prototype__ = Class.prototype;
  var global_class = global_errors[Class.name] = global_errors[Class.name] || Class;
  Class.prototype = Class.__global_prototype__ = global_class.prototype;
  Class.prototype.global_initialize = Class.prototype.global_initialize || function global_initialize(Class){
    var proto_keys = Object.keys(Class.__original_prototype__);
    for(var i = 0; i<proto_keys.length; i++) {
      var proto_key = proto_keys[i];
      this[proto_key] = Class.__original_prototype__[proto_key];
    }
  };
}