var assert = require('assert');
var errors = require('..');
var name = "AlreadyInUseError";
var Err = errors[name];

describe(name, function(){
  it("should work", function(){
    var error = new Err("Entity", 'att1', 'att2', 'att3', 'att4');
    assert.equal(error.name, name), 'Its name is correct.';
    assert.equal(error.message, "The specified 'Entity' value is already in use for: att1, att2, att3, att4");
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });
});
