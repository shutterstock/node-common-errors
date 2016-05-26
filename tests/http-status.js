var assert = require('assert');
var HttpStatusError = require('../').HttpStatusError;

describe("HttpStatusError", function(){
  function performBasicAssertions(error){
    assert.equal(error.name, "HttpStatusError"), 'Its name is correct.';
    assert.ok(new RegExp(error.name + ": " + error.message.replace(/\)/g, '\\)').replace(/\(/g, '\\(') + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, Error, "It is an instanceof Error");
  }

  it("should work with status code and message", function(){
    var error = new HttpStatusError(403, "You got a 403");
    assert.equal(error.message, "You got a 403");
    assert.equal(error.status, 403);
    assert.equal(error.status_code, 403);
    assert.equal(error.statusCode, 403);
    performBasicAssertions(error);
  });

  it("should work with status code", function(){
    var error = new HttpStatusError(403);
    assert.equal(error.message, "(403) Forbidden");
    assert.equal(error.status, 403);
    assert.equal(error.status_code, 403);
    assert.equal(error.statusCode, 403);
    performBasicAssertions(error);
  });

  it("should work with status code and message without new", function(){
    var error = HttpStatusError(403, "You got a 403");
    assert.equal(error.message, "You got a 403");
    assert.equal(error.status, 403);
    assert.equal(error.status_code, 403);
    assert.equal(error.statusCode, 403);
    performBasicAssertions(error);
  });

  it("should work with status code without new", function(){
    var error = HttpStatusError(403);
    assert.equal(error.message, "(403) Forbidden");
    assert.equal(error.status, 403);
    assert.equal(error.status_code, 403);
    assert.equal(error.statusCode, 403);
    performBasicAssertions(error);
  });


});