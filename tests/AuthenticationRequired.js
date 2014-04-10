var assert = require('assert');
var AuthenticationRequired = require('..').AuthenticationRequired;

describe("AuthenticatedRequiredError", function(){
  it("should accept a message", function(){
    var error = new AuthenticationRequired("Test Message"); 
    assert.equal(error.name, "AuthenticationRequiredError"), 'Did we get the correct error name?';
    assert.equal(error.message, "An attempt was made to perform an operation without authentication: Test Message");
  });
});
