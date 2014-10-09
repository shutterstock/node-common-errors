common-errors
===========

Common error classes and utility functions 

* Full suite of node.js Error classes like most other modern languages
* Append stack traces from other asynchronously generated Errors
* Generate your own custom Error classes in one line
* Map HTTP status codes to Errors for automatic handling in web services and applications

[![Build Status](https://secure.travis-ci.org/shutterstock/node-common-errors.png)](http://travis-ci.org/shutterstock/node-common-errors)

## Installation
```npm install common-errors```

## Class Directory

### Common Error Classes

* [AlreadyInUseError](#alreadyinuse)
* [ArgumentError](#argument)
* [ArgumentNullError](#argumentnull)
* [AuthenticationRequiredError](#authrequired)
* [Error](#error)
* [HttpStatusError](#httpstatus)
* [IOError](#io)
  * [DirectoryNotFoundError](#directorynotfound)
  * [DriveNotFoundError](#drivenotfound)
  * [EndOfStreamError](#endofstream)
  * [FileLoadError](#fileload)
  * [FileNotFoundError](#filenotfound)
* [NotFoundError](#notfound)
* [NotImplementedError](#notimplemented)
* [NotPermittedError](#notpermitted)
* [NotSupportedError](#notsupported)
* [OutOfMemoryError](#outofmemory)
* [RangeError](#range)
* [ReferenceError](#reference)
* [StackOverflowError](#stackoverflow)
* [SyntaxError](#syntax)
* [TypeError](#type)
* [URIError](#uri)
* [ValidationError](#validation)


### Utility Functions

* [log](#log)
* [prependCurrentStack](#prependCurrentStack)
* [generateClass](#generateClass)

### Express Middleware Functions

* [Crash Protector](#crashprotector)
* [Error Handler](#errorhandler)

## Common Error Classes

<a name="alreadyinuse" />
### AlreadyInUseError

Applicable when a resource is already in use, for example unique key constraints like a username.

	new AlreadyInUseError(entityName, arg1, [arg2, arg3, arg4, ...])

__Arguments__

* `entityName` - the entity that owns the protected resource
* `args` - the fields or attributes that are already in use

```js
// Example
throw new errors.AlreadyInUseError('user', 'username');
```

---------------------------------------

<a name="argument" />
### ArgumentError

Applicable when there's a generic problem with an argument received by a function call.

	new ArgumentError(argumentName[, inner_error])

__Arguments__

* `argumentName` - the name of the argument that has a problem
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.ArgumentError('username', err);
```

---------------------------------------

<a name="argumentnull" />
### ArgumentNullError

Applicable when an argument received by a function call is null/undefined or empty.

	new ArgumentNullError(argumentName[, inner_error])

__Arguments__

* `argumentName` - the name of the argument that is null
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.ArgumentNullError('username', err);
```

---------------------------------------

<a name="authrequired" />
### AuthenticationRequiredError

Applicable when an operation requires authentication

	new AuthenticationRequiredError(message, [inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.AuthenticationRequiredError("Please provide authentication.", err)
```

---------------------------------------

<a name="error" />
### Error

This is roughly the same as the native Error class. It additionally supports an inner_error attribute.

	new Error(message, [inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.Error("Please provide authentication.", err)
```

---------------------------------------

<a name="httpstatus" />
### HttpStatusError

Represents a message and a HTTP status code.

	new HttpStatusError(status_code[, message])

__Arguments__

* `status_code` - any HTTP status code integer
* `message` - any message

```js
// Example
throw new errors.HttpStatusError(404, "Not Found");
```

	new HttpStatusError(err[, req])

Figure out a proper status code and message from a given error.
To change the mappings, modify `HttpStatusError.message_map` and `HttpStatusError.code_map`

__Arguments__

* `err` - any instanceof Error
* `req` - the request object



```js
// Example
throw new errors.HttpStatusError(err, req);
```

---------------------------------------

<a name="io" />
### IOError

Base class for Errors while accessing information using streams, files and directories.

	new IOError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.IOError("Could not open file", err)
```

---------------------------------------

<a name="directorynotfound" />
### DirectoryNotFoundError

Applicable when part of a file or directory cannot be found.

	new DirectoryNotFoundError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.DirectoryNotFoundError("/var/log", err)
```

---------------------------------------

<a name="drivenotfound" />
### DriveNotFoundError

Applicable when trying to access a drive or share that is not available.

	new DriveNotFoundError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.DriveNotFoundError("c", err)
```

---------------------------------------

<a name="endofstream" />
### EndOfStreamError

Applicable when reading is attempted past the end of a stream.

	new EndOfStreamError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.EndOfStreamError("EOS while reading header", err)
```

---------------------------------------

<a name="fileload" />
### FileLoadError

Applicable when a file is found and read but cannot be loaded.

	new FileLoadError(message[, inner_error])

__Arguments__

* `file_name` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.FileLoadError("./package.json", err)
```

---------------------------------------

<a name="filenotfound" />
### FileNotFoundError

Applicable when an attempt to access a file that does not exist on disk fails.

	new FileNotFoundError(message[, inner_error])

__Arguments__

* `file_name` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.io.FileNotFoundError("./package.json", err)
```

---------------------------------------

<a name="notfound" />
### NotFoundError

Applicable when an attempt to retrieve data yielded no result.

	new NotFoundError(entity_name[, inner_error])

__Arguments__

* `entity_name` - a description for what was not found
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.NotFoundError("User", err)
```

---------------------------------------

<a name="notimplemented" />
### NotImplementedError

Applicable when a requested method or operation is not implemented.

	new NotImplementedError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.NotImplementedError("Method is not yet implemented.", err)
```

---------------------------------------

<a name="notpermitted" />
### NotPermittedError

Applicable when an operation is not permitted

	new NotPermittedError(message[, inner_error])

__Arguments__

* `message` - any message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.NotPermittedError("username cannot be changed once set.", err)
```

---------------------------------------

<a name="notsupported" />
### NotSupportedError

Applicable when a certain condition is not supported by your application.

	new NotSupportedError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.NotSupportedError('Zero values', err);
```

---------------------------------------

<a name="outofmemory" />
### OutOfMemoryError

Applicable when there is not enough memory to continue the execution of a program.

	new OutOfMemoryError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.OutOfMemoryError('Maximum mem size exceeded.', err);
```

---------------------------------------

<a name="range" />
### RangeError

Represents an error that occurs when a numeric variable or parameter is outside of its valid range. This is roughly the same as the native RangeError class. It additionally supports an inner_error attribute.

	new RangeError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.RangeError("Value must be between " + MIN + " and " + MAX, err);
```

---------------------------------------

<a name="reference" />
### ReferenceError

Represents an error when a non-existent variable is referenced. This is roughly the same as the native ReferenceError class. It additionally supports an inner_error attribute.

	new ReferenceError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.ReferenceError("x is not defined", err);
```

---------------------------------------

<a name="stackoverflow" />
### StackOverflowError

Applicable when the execution stack overflows because it contains too many nested method calls.

	new StackOverflowError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.StackOverflowError('Stack overflow detected.', err);
```

---------------------------------------

<a name="syntax" />
### SyntaxError

Represents an error when trying to interpret syntactically invalid code. This is roughly the same as the native SyntaxError class. It additionally supports an inner_error attribute.

	new SyntaxError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.SyntaxError("Unexpected token a", err);
```

---------------------------------------

<a name="type" />
### TypeError

Represents an error when a value is not of the expected type. This is roughly the same as the native TypeError class. It additionally supports an inner_error attribute.

	new TypeError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.TypeError("number is not a function", err);
```

---------------------------------------

<a name="uri" />
### URIError

Represents an error when a value is not of the expected type. This is roughly the same as the native URIError class. It additionally supports an inner_error attribute.

	new URIError(message[, inner_error])

__Arguments__

* `message` - a message
* `inner_error` - the Error instance that caused the current error. Stack trace will be appended.

```js
// Example
throw new errors.URIError("URI malformed", err);
```

---------------------------------------

<a name="validation" />
### ValidationError

Useful for denoting a problem with a user-defined value.  Generally, you won't throw this error.
It serializes to JSON, and it can also function as an envelope for multiple errors.

	new ValidationError(message, [code], [field])

__Arguments__

* `message` - any message
* `code` - an optional error code
* `field` - an optional description of the data

__Methods__

* `addError(error)` - add an error object to the `errors` array, and return `this`.
* `addErrors(errors)` - append an array of error objects to the `errors` array, and return `this`.

```js
// Example
function validateUsername(username){
	var errors = new errors.ValidationError();
	if(username.length < 3) errors.addError(new errors.ValidationError("username must be at least two characters long", "VAL_MIN_USERNAME_LENGTH", "username"));
	if(/-%$*&!/.test(username)) errors.addError(new errors.ValidationError("username may not contain special characters", "VAL_USERNAME_SPECIALCHARS", "username"));
	return errors;
}
```

## Utility Functions

<a name="log" />
### Log

Modifies an error's stack to include the current stack and logs it to *stderr*.  Useful for logging errors received by a callback.

	log(err[, message])

__Arguments__

* `err` - any error or error message received from a callback
* `message` - any message you'd like to prepend

```js
// Example
mysql.query('SELECT * `FROM` users', function(err, results){
	if(err) return errors.log(err, "Had trouble retrieving users.");
	console.log(results);
});
```

<a name="prependCurrentStack" />
### prependCurrentStack

Modifies an error's stack to include the current stack without logging it.  Useful for logging errors received by a callback.

	prependCurrentStack(err)

__Arguments__

* `err` - any error or error message received from a callback

```js
// Example
mysql.query('SELECT * `FROM` users', function(err, results){
	if(err) {
		return errors.prependCurrentStack(err); // caller has better idea of source of err
	}
	console.log(results);
});
```

<a name="generateClass" />
### generateClass

Simple interface for generating a new Error class type.

	helpers.generateClass(name[, options])

__Arguments__

* `name` - The full name of the new Error class
* `options`
  * `extends` - The base class for the new Error class. Default is `Error`.
  * `globalize` - Boolean (default `true`) to store the Error in global space so that the Error is equivalent to others included from other versions of the module.
  * `args` - Array of names of values to accept and store from the class constructor. Default is `['message', 'inner_error']`.
  * `generateMessage` - A function for defining a custom error message.

```js
// Example
var ArgumentNullError = helpers.generateClass("ArgumentNullError", {
  extends: ArgumentError,
  args: ['argumentName'],
  generateMessage: function(){
    return "Missing argument: " + this.argumentName;
  }
});

throw new ArgumentNullError("username");
```


## Express Middleware Functions

<a name="crashprotector" />
### Crash Protector

Express middleware for preventing the web server from crashing when an error is thrown from an asynchronous context.  
Any error that would have caused a crash is logged to *stderr*.

```js
// Example
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(errors.middleware.crashProtector());

//insert new middleware here

app.get('/healthcheck', function (req, res, next){res.send('YESOK')});

app.use(app.router);
app.use(errors.middleware.errorHandler);

module.exports = app;
```

<a name="errorhandler" />
### Error Handler

Express middleware that translates common errors into HTTP status codes and messages.

```js
// Example
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(errors.middleware.crashProtector());

//insert new middleware here

app.get('/healthcheck', function (req, res, next){res.send('YESOK')});

app.use(app.router);
app.use(errors.middleware.errorHandler);

module.exports = app;
```




## Authors

This library was developed by David Fenster at [Shutterstock](http://www.shutterstock.com)


## License

Copyright (C) 2013-2014 by Shutterstock Images, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


