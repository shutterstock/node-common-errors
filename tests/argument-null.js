var assert = require('assert');
var errors = require('..');
var name = "ArgumentNull";
var Err = errors[name];

describe(name + "Error", function(){
  it("should work", function(){
    var error = new Err("arg1");
    assert.equal(error.name, name + "Error"), 'Its name is correct.';
    assert.equal(error.message, "Missing argument: arg1");
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });
});
