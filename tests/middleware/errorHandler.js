var assert = require('assert');
var sinon = require('sinon');
var supertest = require('supertest');
var express3 = require('express3');
var express4 = require('express');
var body_parser = require('body-parser');
var errors = require('../../');
var errorHandler = errors.middleware.errorHandler;

var sandbox = sinon.sandbox.create();

describe("errorHandler", function(){
  var err;

  var app = new express4();
  app.use(body_parser.json());
  app.all('/error', function(req, res, next){ return next(err); });
  app.post('/error/:test', function(req, res, next){ return next(err); });
  app.use(errorHandler);
  var request = new supertest(app);

  beforeEach(function(){
    sandbox.stub(console, 'error', function(message){ });
  });

  afterEach(function(){
    sandbox.restore();
  })

  it("should handle NotPermittedError", function(done){
    err = new errors.NotPermitted("don't do that");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 403);
      assert.equal(res.text, "An attempt was made to perform an operation that is invalid: don't do that");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle AuthenticationRequired", function(done){
    err = new errors.AuthenticationRequired("gime password");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 401);
      assert.equal(res.text, "An attempt was made to perform an operation without authentication: gime password");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle Validation", function(done){
    err = new errors.Validation("bad")
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 400);
      assert.equal(res.text, "bad");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle AlreadyInUse", function(done){
    err = new errors.AlreadyInUse("bad", "test");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 409);
      assert.equal(res.text, "The specified 'bad' value is already in use for: test");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle ArgumentNull", function(done){
    err = new errors.ArgumentNull("test");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 404);
      assert.equal(res.text, "Not Found: \"test\"");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle ArgumentNull route param", function(done){
    err = new errors.ArgumentNull("test");
    request.post('/error/1').end(function(err, res){
      assert.equal(res.res.statusCode, 404);
      assert.equal(res.text, "Not Found: \"test\"");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle ArgumentNull route param in express3", function(done){
    err = new errors.ArgumentNull("test");

    var app = express3();
    app.use(app.router)
    app.use(errorHandler);
    app.post('/error/:test', function(req, res, next){
      return next(err);
    });

    var request = new supertest(app);

    request.post('/error/1').end(function(err, res){
      assert.equal(res.res.statusCode, 404);
      assert.equal(res.text, "Not Found: \"test\"");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle ArgumentNull POST", function(done){
    err = new errors.ArgumentNull("test");
    request.post('/error').send({test:1}).end(function(err, res){
      assert.equal(res.res.statusCode, 400);
      assert.equal(res.text, "Not Found: \"test\"");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle NotFoundError", function(done){
    err = new errors.NotFoundError("test");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 404);
      assert.equal(res.text, "Not Found: \"test\"");
      assert.ok(!console.error.called, "console.error not called");
      done();
    });
  });

  it("should handle Error", function(done){
    err = new Error("test");
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 500);
      assert.equal(res.text, "Internal Server Error!");
      assert.ok(console.error.called);
      assert.ok(/test/.test(console.error.getCall(0).args[0]));
      done();
    });
  });  

  it("should handle Error status", function(done){
    err = new Error("test");
    err.status = 544;
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 544);
      assert.equal(res.text, "Internal Server Error!");
      assert.ok(console.error.called);
      assert.ok(/test/.test(console.error.getCall(0).args[0]));
      done();
    });
  });  

  it("should handle HttpStatusError (deprecated)", function(done){
    err = new errors.HttpStatus('custom status message', 544);
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 544);
      assert.equal(res.text, "Internal Server Error!");
      assert.ok(console.error.called);
      assert.ok(/custom status message/.test(console.error.getCall(0).args[0]));
      done();
    });
  });  

  it("should handle HttpStatusError", function(done){
    err = new errors.HttpStatus(544, 'custom status message')
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 544);
      assert.equal(res.text, "Internal Server Error!");
      assert.ok(console.error.called);
      assert.ok(/custom status message/.test(console.error.getCall(0).args[0]));
      done();
    });
  });  

  it("should handle HttpStatusError 400", function(done){
    err = new errors.HttpStatus(444, 'custom status message')
    request.get('/error').end(function(err, res){
      assert.equal(res.res.statusCode, 444);
      assert.equal(res.text, "custom status message");
      assert.ok(!console.error.called);
      done();
    });
  });  

  it("should work with express 3", function(done){
    var app = express3();
    app.use(app.router)
    app.use(errorHandler);
    app.get('/error', function(req, res, next){
      return next(new Error("This is a test"));
    });

    var request = new supertest(app);
    request.get('/error')
    .end(function(err, res){
      assert.equal(res.res.statusCode, 500);
      done();
    })
  })

});
