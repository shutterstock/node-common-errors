var assert = require('assert');
var errors = require('../..');

module.exports.testError = function testError(name, opts){
  opts = opts || {};
  opts.message = opts.message || "test message";
  opts.message_to_assert = opts.message_to_assert || opts.message;
  opts.extends = opts.extends || Error;
  opts.full_name = opts.full_name || name;

  describe(name, function(){
    it("should work", function(){
      var Err = errors;
      (opts.full_name).split('.').forEach(function(dir){ Err = Err[dir]; });
      assert.ok(Err, name + " exists.");
      var inner_error = new Error("inner error");
      var error = new Err(opts.message);
      assert.equal(error.name, name), 'Its name is correct.';
      assert.equal(error.message, opts.message_to_assert);
      assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
      assert.equal(Err.super_.name, opts.extends.name, "It is an instance of" + opts.extends.name);
      assert.ok(error instanceof Error, opts.extends, "It is an instanceof " + opts.extends.name);
    });
  });
}
