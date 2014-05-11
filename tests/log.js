var errors = require('../');
var _      = require('lodash');
var assert = require('assert');

describe("errors.log", function(){

  var consoleFunctions = {};
  Object.keys(console).forEach(function(key){
    consoleFunctions[key] = console[key];
  });

  var errorLog;

  beforeEach(function(cb){
    errorLog = [];

    console.error = function(message){
      if(message && message.message) errorLog.push(message.message);
      else errorLog.push(message);
    };

    cb();
  });

  afterEach(function(cb){
    Object.keys(consoleFunctions).forEach(function(key){
      console[key] = consoleFunctions[key];
    });
    cb();
  })

  var logAnError = function (err, message) {
    return errors.log(err, message)
  }

  it("should log a message", function(){
    var err = new Error("This is a assert.");
    var err2 = logAnError(err, "Panic!");
    assert.equal(errorLog.length, 1);
    assert.ok(/Error: Panic!/.test(errorLog[0]), 'message matches');
    assert.ok(err2.isLogged);
    assert.ok(err2 instanceof Error, 'we have a javascript error object');

    var stack = err2.stack.split("\n");
    assert.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
    var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
    assert.ok(splitterIndex, 'we spit the stacks with "===="');
    assert.ok(/Context\.<anonymous>/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');
  });

  it("log string error", function(){
    var err2 = logAnError("Panic!");
    assert.equal(errorLog.length, 1);
    assert.ok(/Error: Panic!/.test(errorLog[0]), 'message matches');
    assert.ok(err2.isLogged);
    assert.ok(err2 instanceof errors.Error, 'we have an error');
    assert.ok(!/====[ ]/.test(errorLog[0]), "we don't prepend any stack traces");
  })

  it("log error, no message", function(){
    var err = new Error("This is a assert.");
    var err2 = logAnError(err);
    assert.equal(errorLog.length, 1);
    assert.ok(/Error: This is a assert./.test(errorLog[0]), "message matches");

    var stack = err2.stack.split("\n");
    assert.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
    var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
    assert.ok(splitterIndex, 'we spit the stacks with "===="');
    assert.ok(/Context\.<anonymous>/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');

    assert.ok(err2 instanceof Error, 'we have a javascript error object');
    assert.ok(err2.isLogged);
  })

  it("log generic error", function(){
    var err = new errors.Generic("This is a assert.");
    var err2 = logAnError(err);
    assert.equal(errorLog.length, 1);
    assert.ok(/GenericError: This is a assert./.test(errorLog[0]), "message matches");
    assert.ok(err2 instanceof errors.Generic, 'we have a generic error');
    assert.ok(err2.isLogged);

    var stack = err2.stack.split("\n");
    assert.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
    var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
    assert.ok(splitterIndex, 'we spit the stacks with "===="');
    assert.ok(/Context\.<anonymous>/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');
  });
})