var assert = require('assert');
var errors = require('..');
var name = "ValidationError";
var Err = errors[name];

describe(name, function(){
  it("should work", function(){
    var error = new Err("This is a validation message.", 'VAL_CODE_1', 'name');
    assert.equal(error.name, name), 'Its name is correct.';
    assert.equal(error.message, "This is a validation message.");
    assert.equal(error.field, "name");
    assert.deepEqual(error.toJSON(), {"text":"This is a validation message.","field":"name","code":"VAL_CODE_1"});
    assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
    assert.ok(error instanceof Error, "It is an instanceof Error");
  });

  describe("nested errors", function(){
    it("should addError", function(){
      var error = new Err().addError(new Err("This is a validation message.", 'VAL_CODE_1', 'name'));
      assert.equal(error.name, name), 'Its name is correct.';
      assert.equal(error.message, "Validation failed.");
      assert.deepEqual(error.toJSON(), {
        message: "Validation failed.",
        errors: [{
          "text":"This is a validation message.",
          "field":"name",
          "code":"VAL_CODE_1"
        }]
      });
      assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
      assert.ok(error instanceof Error, "It is an instanceof Error");
    });

    it("should addErrors", function(){
      var error = new Err().addErrors([new Err("This is a validation message.", 'VAL_CODE_1', 'name')]);
      assert.equal(error.name, name), 'Its name is correct.';
      assert.equal(error.message, "Validation failed.");
      assert.deepEqual(error.toJSON(), {
        message: "Validation failed.",
        errors: [{
          "text":"This is a validation message.",
          "field":"name",
          "code":"VAL_CODE_1"
        }]
      });
      assert.ok(new RegExp(error.name + ": " + error.message + "\n(.*\n)+").test(error.stack), "Stack is good");
      assert.ok(error instanceof Error, "It is an instanceof Error");
    });

    it("should require an Array for addErrors", function(){
      var caught_error;
      try {
        var error = new Err().addErrors(1);
      } catch(e) {
        caught_error = e;
      }

      assert.ok(caught_error instanceof errors['ArgumentError'])
    });
  });
});
