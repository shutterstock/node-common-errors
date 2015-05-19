var assert = require('assert');
var errors = require('..');
var name = "TimeoutError";
var Err = errors[name];

describe(name, function(){
  it("should work for durations", function(){
    var error = new Err(100);
    assert.equal(error.name, name), 'Its name is correct.';
    assert.equal(error.message, "Timeout of '100' exceeded");
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });

  it("should work", function(){
    var error = new Err("query took too long");
    assert.equal(error.name, name), 'Its name is correct.';
    assert.equal(error.message, "Timeout exceeded: query took too long");
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });

});
