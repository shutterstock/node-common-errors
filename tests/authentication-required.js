var assert = require('assert');
var errors = require('..');
var name = "AuthenticationRequired";
var Err = errors[name];

describe(name + "Error", function(){
  it("should work", function(){
    var error = new Err("password is incorrect");
    assert.equal(error.name, name + "Error"), 'Its name is correct.';
    assert.equal(error.message, "An attempt was made to perform an operation without authentication: password is incorrect");
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });
});
