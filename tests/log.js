var errors = require('../');
var _      = require('lodash');

var consoleFunctions = {};
Object.keys(console).forEach(function(key){
  consoleFunctions[key] = console[key];
});

var errorLog;
module.exports.setUp = function(cb){
  errorLog = [];

  console.error = function(message){
    if(message && message.message) errorLog.push(message.message);
    else errorLog.push(message);
  };

  cb();
}

module.exports.tearDown = function(cb){
  Object.keys(consoleFunctions).forEach(function(key){
    console[key] = consoleFunctions[key];
  });
  cb();
}

var logAnError = function (err, message) {
  return errors.log(err, message)
}

module.exports["log message"] = function(test){
  var err = new Error("This is a test.");
  var err2 = logAnError(err, "Panic!");
  test.equals(errorLog.length, 1);
  test.ok(/Error: Panic!/.test(errorLog[0]), 'message matches');
  test.ok(err2.isLogged);
  test.ok(err2 instanceof Error, 'we have a javascript error object');

  var stack = err2.stack.split("\n");
  test.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
  var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
  test.ok(splitterIndex, 'we spit the stacks with "===="');
  test.ok(/Object\.module\.exports\.log message/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');

  test.done();
}

module.exports["log string error"] = function(test){
  var err2 = logAnError("Panic!");
  test.equals(errorLog.length, 1);
  test.ok(/GenericError: Panic!/.test(errorLog[0]), 'message matches');
  test.ok(err2.isLogged);
  test.ok(err2 instanceof errors.Generic, 'we have a generic error');
  test.ok(!/====/.test(errorLog[0]), "we don't prepend any stack traces");
  test.done();
}

module.exports["log error, no message"] = function(test){
  var err = new Error("This is a test.");
  var err2 = logAnError(err);
  test.equals(errorLog.length, 1);
  test.ok(/Error: This is a test./.test(errorLog[0]), "message matches");

  var stack = err2.stack.split("\n");
  test.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
  var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
  test.ok(splitterIndex, 'we spit the stacks with "===="');
  test.ok(/Object\.module\.exports\.log error\, no message/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');

  test.ok(err2 instanceof Error, 'we have a javascript error object');
  test.ok(err2.isLogged);
  test.done();
}

module.exports["log generic error"] = function(test){
  var err = new errors.Generic("This is a test.");
  var err2 = logAnError(err);
  test.equals(errorLog.length, 1);
  test.ok(/GenericError: This is a test./.test(errorLog[0]), "message matches");
  test.ok(err2 instanceof errors.Generic, 'we have a generic error');
  test.ok(err2.isLogged);

  var stack = err2.stack.split("\n");
  test.ok(/logAnError/.test(stack[1]), 'we prepend the current stack trace');
  var splitterIndex = _(stack).findIndex(function(item){return item == '===='});
  test.ok(splitterIndex, 'we spit the stacks with "===="');
  test.ok(/Object\.module\.exports\.log generic error/.test(stack.slice(splitterIndex)[1]), 'we keep the old stack trace');

  test.done();
}
