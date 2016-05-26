var assert = require('assert');
var errors = require('../..');
var Promise = require('bluebird');

module.exports.testError = function testError(name, opts){
  opts = opts || {};
  opts.message = opts.message || "test message";
  opts.message_to_assert = opts.message_to_assert || opts.message;
  opts.extends = opts.extends || Error;
  opts.full_name = opts.full_name || name;

  function performAssertions(Err, error) {
    assert.equal(error.name, name), 'Its name is correct.';
    assert.equal(error.message, opts.message_to_assert);
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.equal(Err.super_.name, opts.extends.name, "It is an instance of" + opts.extends.name);
    assert.ok(error instanceof Error, "It is an instanceof Error");
    assert.ok(error instanceof opts.extends, "It is an instanceof " + opts.extends.name);

    var caught_error_in_promise = false;
    var promise = new Promise(function(res, rej) { res(true); }).then(function(){
      throw new Err("test error");
    }).catch(opts.extends, function(e){
      caught_error_in_promise = true;
    }).finally(function(){
      assert.ok(caught_error_in_promise, "caught promise error");
    });
  }  

  describe(name, function(){
    var Err = errors;
    (opts.full_name).split('.').forEach(function(dir){ Err = Err[dir]; });

    it("should work", function(){
      assert.ok(Err, name + " exists.");
      var inner_error = new Error("inner error");
      var error = new Err(opts.message);

      performAssertions(Err, error);
    });

    it("should work without new", function(){
      assert.ok(Err, name + " exists.");
      var inner_error = new Error("inner error");
      var error = Err(opts.message);

      performAssertions(Err, error);
    });
  });
}
