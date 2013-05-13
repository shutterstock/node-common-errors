var errors = require('../');

var consoleFunctions = {};
Object.keys(console).forEach(function(key){
  consoleFunctions[key] = console[key];
});

var errorLog;
module.exports.setUp = function(cb){
  errorLog = [];

  console.error = function(message){
    if(message.message) errorLog.push(message.message);
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

module.exports["log message"] = function(test){
  var err = new Error("This is a test.");
  var err2 = errors.log(err, "Panic!");
  test.equals(errorLog.length, 1);
  test.equals(errorLog[0], "Panic!");
  test.equals(err, err2.innerError);
  test.ok(err2.isLogged);
  test.done();
}

module.exports["log string error"] = function(test){
  var err2 = errors.log("Panic!");
  test.equals(errorLog.length, 1);
  test.equals(errorLog[0], "A generic error has occurred.");
  test.equals(err2.innerError.message, "Panic!");
  test.ok(err2.isLogged);
  test.done();
}

module.exports["log error, no message"] = function(test){
  var err = new Error("This is a test.");
  var err2 = errors.log(err);
  test.equals(errorLog.length, 1);
  test.equals(errorLog[0], "A generic error has occurred.");
  test.equals(err, err2.innerError)
  test.ok(err2.isLogged);
  test.done();
}
