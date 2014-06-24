var assert = require('assert');
var errors = require('../../');
var EventEmitter = require('events').EventEmitter;

describe('prependCurrentStack', function(){
  it("should work", function(){
    var event = new EventEmitter();
    function foo(cb) {
      return bar(cb);
    }
    function bar(cb) {
      return cb(new Error("Inner Error"));
    }

    event.on('error', function final(err){
      errors.prependCurrentStack(err);
      assert.ok(err, "Got an error");
      var stack_split = err.stack.split('===');
      assert.ok(/Error: Inner Error\n\s*at EventEmitter.final.*/.test(stack_split[0]));
      assert.ok(/\n\s*at bar.*\n\s*at foo/.test(stack_split[1]), "Stack is good");
    });

    foo(function callback(err){
      process.nextTick(function emitEvent(){
        event.emit('error', err);
      })
    })
  });
});

describe("global namespace", function(){
  it("should maintain a global namespace for instanceof", function(){
    var external_errors = require('common-errors');
    var TestError = errors.helpers.generateClass('Error');
    var err = new errors.Error("This is an error");
    var external_err = new external_errors.Error("This is an error");
    var test_err = new TestError("This is an error");

    assert.notEqual(err.stack, test_err.stack, 'err and new err stacks are not equal');
    assert.notEqual(err.stack, external_err.stack, 'err and external err stacks are not equal');
    assert.notEqual(test_err.stack, external_err.stack, 'new err and external err stacks are not equal');
    assert.equal(err.stack.replace(/:\d+:\d+/, ''), test_err.stack.replace(/:\d+:\d+/, ''), 'err and new err have almost the same stack');
    assert.equal(err.stack.replace(/:\d+:\d+/, ''), external_err.stack.replace(/:\d+:\d+/, ''), 'err and external err have almost the same stack');
    assert.equal(test_err.stack.replace(/:\d+:\d+/, ''), external_err.stack.replace(/:\d+:\d+/, ''), 'new err and external error have almost the same stack');

    assert.ok(err instanceof errors.Error, 'err instanceof its own class');
    assert.ok(err instanceof TestError, 'err instanceof a new Error');
    assert.ok(err instanceof external_errors.Error, 'err instanceof an external Error');
    assert.ok(test_err instanceof errors.Error, 'new err instanceof Error');
    assert.ok(test_err instanceof TestError, 'new err instanceof itself');
    assert.ok(test_err instanceof external_errors.Error, 'new err instanceof an external Error');
    assert.ok(external_err instanceof errors.Error, 'external error instanceof Error');
    assert.ok(external_err instanceof TestError, 'external error instanceof new Error');
    assert.ok(external_err instanceof external_errors.Error, 'external error instanceof itself');
  });
});


