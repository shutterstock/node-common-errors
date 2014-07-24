var assert = require('assert');
var classGenerator = require('../../lib/helpers/class-generator');
var errors = require('../../');

describe('classGenerator', function(){
  it("should work", function(){
    var Err = classGenerator("Err", {args: ['message', 'inner_error', 'arg1', 'arg2']});
    assert.ok(Err, 'Error returned');
    assert.equal(Err.length, 4, "has proper constructor arguments");
    assert.equal(Err.super_, Error, "is instanceof Error");
    assert.equal(Err.name, "Err", "has proper name");
  });

  it('should be safe to use a name - strings only', function(){
    var caught_error;
    try {
      var Err = classGenerator(2);
    } catch(e) {
      caught_error = e;
    }
    assert.ok(caught_error, "using a non-string is unsafe.");
  });

  it('should be safe to use a name - word characters only', function(){
    var caught_error;
    try {
      var Err = classGenerator("New Error");
    } catch(e) {
      caught_error = e;
    }
    assert.ok(caught_error, "using a non-string is unsafe.");
  });

  it('should be safe to use custom arguments - array only', function(){
    var caught_error;
    try {
      var Err = classGenerator("NewError", {args: {}});
    } catch(e) {
      caught_error = e;
    }
    assert.ok(caught_error, "using a non-array is unsafe.");
  });

  it('should be safe to use custom arguments - array of strings only', function(){
    var caught_error;
    try {
      var Err = classGenerator("NewError", {args: ['arg1', 2]});
    } catch(e) {
      caught_error = e;
    }
    assert.ok(caught_error, "using a non-strings in args array is unsafe");
  });

  it('should be safe to use custom arguments - array of strings only', function(){
    var caught_error;
    try {
      var Err = classGenerator("NewError", {args: ['arg1', 'arg 2']});
    } catch(e) {
      caught_error = e;
    }
    assert.ok(caught_error, "using non-word characters in args array is unsafe");
  });

  it('should globalize errors', function(){
    var GlobalError = classGenerator("SomeError");
    var GlobalError2 = classGenerator("SomeError");
    var LocalError = classGenerator("SomeError", {globalize: false});

    assert.ok(new GlobalError() instanceof Error);
    assert.ok(new GlobalError2() instanceof Error);
    assert.ok(new LocalError() instanceof Error);
    assert.ok(new GlobalError() instanceof GlobalError2);
    assert.ok(new GlobalError2() instanceof GlobalError);
    assert.ok(!(new GlobalError() instanceof LocalError));
  });
});