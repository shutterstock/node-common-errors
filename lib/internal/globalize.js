var util = require('util');
var global = require('./global');
var key = "__COMMON-ERRORS-TYPES__";
var global_errors = global[key] = global[key] || {};

module.exports = function global_extend(Class, subclass) {
  var global_class = global_errors[Class.name];
  var global_exists = global_class && global_class.super_.name == subclass.name;
  if(global_exists) Class.prototype = global_class.prototype;
  else util.inherits(Class, subclass);
  Class.super_ = subclass;
  Class.prototype.__global_type__ = global_errors[Class.name] = global_class || Class;
}