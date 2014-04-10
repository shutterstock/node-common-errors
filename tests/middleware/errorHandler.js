var assert = require('assert');
var sinon = require('sinon');
var errors = require('../../');
var errorHandler = errors.middleware.errorHandler;

var sandbox = sinon.sandbox.create();

var Response = function Response(){}
Response.prototype.send = function(status_code, message){
  this.status_code = status_code;
  this.message = message;
};

describe("errorHandler", function(){
  beforeEach(function(){
    sandbox.stub(console, 'error', function(message){
    })
  });

  afterEach(function(){
    sandbox.restore();
  })

  it("should handle NotPermittedError", function(){
    var res = new Response();
    errorHandler(new errors.NotPermitted("don't do that"), {}, res);
    assert.equal(res.status_code, 403);
    assert.equal(res.message, "An attempt was made to perform an operation that is invalid: don't do that");
    assert.ok(!console.error.called);
  });

  it("should handle AuthenticationRequired", function(){
    var res = new Response();
    errorHandler(new errors.AuthenticationRequired("gime password"), {}, res);
    assert.equal(res.status_code, 401);
    assert.equal(res.message, "An attempt was made to perform an operation without authentication: gime password");
    assert.ok(!console.error.called);
  });

  it("should handle Validation", function(){
    var res = new Response();
    errorHandler(new errors.Validation("bad"), {}, res);
    assert.equal(res.status_code, 400);
    assert.equal(res.message, "bad");
    assert.ok(!console.error.called);
  });

  it("should handle AlreadyInUse", function(){
    var res = new Response();
    errorHandler(new errors.AlreadyInUse("bad", "test"), {}, res);
    assert.equal(res.status_code, 409);
    assert.equal(res.message, "The specified 'bad' value is already in use for: test");
    assert.ok(!console.error.called);
  });

  it("should handle AlreadyInUse", function(){
    var res = new Response();
    errorHandler(new errors.ArgumentNull("test"), {method:"GET"}, res);
    assert.equal(res.status_code, 404);
    assert.equal(res.message, "Not Found: \"test\"");
    assert.ok(!console.error.called);
  });

  it("should handle AlreadyInUse POST param", function(){
    var res = new Response();
    errorHandler(new errors.ArgumentNull("test"), {method:"POST", params:{"test":"1"}}, res);
    assert.equal(res.status_code, 404);
    assert.equal(res.message, "Not Found: \"test\"");
    assert.ok(!console.error.called);
  });

  it("should handle AlreadyInUse POST", function(){
    var res = new Response();
    errorHandler(new errors.ArgumentNull("test"), {method:"POST", params:{}}, res);
    assert.equal(res.status_code, 400);
    assert.equal(res.message, "Not Found: \"test\"");
    assert.ok(!console.error.called);
  });

  it("should handle Error", function(){
    var res = new Response();
    errorHandler(new Error("test"), {}, res);
    assert.equal(res.status_code, 500);
    assert.equal(res.message, "Internal Server Error!");
    assert.ok(console.error.called);
    assert.ok(/test/.test(console.error.getCall(0).args[0]));
  });  

  it("should handle Error status", function(){
    var res = new Response();
    var err = new Error("test");
    err.status = 544;
    errorHandler(err, {}, res);
    assert.equal(res.status_code, 544);
    assert.equal(res.message, "Internal Server Error!");
    assert.ok(console.error.called);
    assert.ok(/test/.test(console.error.getCall(0).args[0]));
  });  

  it("should handle HttpStatusError (deprecated)", function(){
    var res = new Response();
    errorHandler(new errors.HttpStatus('custom status message', 544), {}, res);
    assert.equal(res.status_code, 544);
    assert.equal(res.message, "Internal Server Error!");
    assert.ok(console.error.called);
    assert.ok(/custom status message/.test(console.error.getCall(0).args[0]));
  });  

  it("should handle HttpStatusError", function(){
    var res = new Response();
    errorHandler(new errors.HttpStatus(544, 'custom status message'), {}, res);
    assert.equal(res.status_code, 544);
    assert.equal(res.message, "Internal Server Error!");
    assert.ok(console.error.called);
    assert.ok(/custom status message/.test(console.error.getCall(0).args[0]));
  });  

  it("should handle HttpStatusError 400", function(){
    var res = new Response();
    errorHandler(new errors.HttpStatus(444, 'custom status message'), {}, res);
    assert.equal(res.status_code, 444);
    assert.equal(res.message, "custom status message");
    assert.ok(!console.error.called);
  });  

});
