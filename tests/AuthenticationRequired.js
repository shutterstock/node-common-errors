var AuthenticationRequired = require('..').AuthenticationRequired;

exports["AuthenticationRequired"] = function (test) {
  var error = new AuthenticationRequired("Test Message"); 
  test.equals(error.name, "AuthenticationRequiredError"), 'Did we get the correct error name?';
  test.equals(error.message, "An attempt was made to perform an operation without authentication: Test Message");
  test.done();
};
