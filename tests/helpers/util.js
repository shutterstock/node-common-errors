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

