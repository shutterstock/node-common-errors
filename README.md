node-errors
===========

Common error classes and utility functions

## Class Directory

### Common Error Classes

* [AlreadyInUseError](#alreadyinuse)
* [ArgumentError](#argument)
* [ArgumentNullError](#argumentnull)
* [GenericError](#generic)
* [HttpStatusError](#httpstatus)
* [NotPermittedError](#notpermitted)
* [ValidationError](#validation)

### Utility Functions

* [log](#log)

### Express Middleware Functions

* [Crash Protector](#crashprotector)
* [Error Handler](#errorhandler)

## Common Error Classes

<a name="alreadyinuse" />
### AlreadyInUseError

Applicable when a resource is already in use, for example unique key constraints like a username.

__Arguments__

new ArgumentNullError(entityName, arg1, [arg2, arg3, arg4, ...])

* entityName - the entity that owns the protected resource
* args - the fields or attributes that are already in use

```js
throw new errors.ArgumentNull('user', 'username');
```

---------------------------------------

<a name="argument" />
### ArgumentError

Applicable when there's a generic problem with an argument received by a function call.

__Arguments__

new ArgumentError(argumentName)

* argumentName - the name of the argument that has a problem

```js
throw new errors.Argument('username');
```

---------------------------------------

<a name="argumentnull" />
### ArgumentNullError

Applicable when an argument received by a function call is null/undefined or empty.

__Arguments__

new ArgumentNullError(argumentName)

* argumentName - the name of the argument that is null

```js
throw new errors.ArgumentNull('username');
```

---------------------------------------

<a name="generic" />
### GenericError

Applicable for any error returned by a callback, or any time you want to throw a new error that is based from another error.
Call stacks from both errors will be concatenated for a full call stack.  This effectively patches a design issue in JavaScript
where logging an error from an asynchronous callback will show only the call stack from the error's context, but does not
show the the stack where it was consumed.
For example, if you perform a SQL query that returns an error with the callback, you don't know where in *your* code the offending
query was generated.  Wrapping the returned error in your own GenericError will solve this problem.

__Arguments__

new GenericError(message[, innerError])

* message - any message you want
* innerError - any error that you want to preserve with the new error

```js
mysql.query('SELECT * FROM users', function(err, results){
	if(err) return new errors.Generic("Had trouble retrieving users.", err);
	console.log(results);
})
```

---------------------------------------

<a name="httpstatus" />
### HttpStatusError

Represents a message and a HTTP status code.

__Arguments__

new HttpStatusError(message, statusCode)

* message - any message
* statusCode - any HTTP status code integer

```js
throw new errors.HttpStatus("Not Found", 404);
```

---------------------------------------

<a name="notpermitted" />
### NotPermittedError

Applicable when an operation is not permitted

__Arguments__

new NotPermittedError(message)

* message - any message

```js
throw new errors.NotPermitted("username cannot be changed once set.")
```

---------------------------------------

<a name="validation" />
### ValidationError

Useful for denoting a problem with a user-defined value.  Generally, you wont throw this error.

__Arguments__

new ValidationError(message[, code])

* message - any message
* code - an optional error code

```js
function validateUsername(username){
	var errors = [];
	if(username.length < 3) errors.push(new errors.Validation("username must be at least two characters long", "VAL_MIN_USERNAME_LENGTH"));
	if(/-%$*&!/.test(username)) errors.push(new errors.Validation("username may not contain special characters", "VAL_USERNAME_SPECIALCHARS"));
	return errors;
}
```

## Utility Functions

<a name="log" />
### Log

Wraps a given error in a GenericError and logs it to *stderr*.  Useful for logging errors received by a callback.

__Arguments__

log(err[, message])

* err - any error or error message received from a callback
* message - any message you'd like to prepend

```js
mysql.query('SELECT * FROM users', function(err, results){
	if(err) return errors.log(err, "Had trouble retrieving users.");
	console.log(results);
});
```

## Express Middleware Functions

<a name="crashprotector" />
### Crash Protector

Express middleware for preventing the web server from crashing when an error is thrown from an asynchronous context.  
Any error that would have caused a crash is logged to *stderr*.

```js
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

Copyright (C) 2013 by Shutterstock Images, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




