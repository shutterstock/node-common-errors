node-errors
===========

Common error classes and utility functions

## Class Directory

### Common Error Classes

* [AlreadyInUseError](#alreadyinuse)
* [ArgumentError](#argument)
* [ArgumentNullError](#argumentnull)
* [AuthenticationRequiredError](#authrequired)
* [GenericError](#generic)
* [HttpStatusError](#httpstatus)
* [NotPermittedError](#notpermitted)
* [NotSupportedError](#notsupported)
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

	new ArgumentNullError(entityName, arg1, [arg2, arg3, arg4, ...])

__Arguments__

* `entityName` - the entity that owns the protected resource
* `args` - the fields or attributes that are already in use

```js
// Example
throw new errors.ArgumentNull('user', 'username');
```

---------------------------------------

<a name="argument" />
### ArgumentError

Applicable when there's a generic problem with an argument received by a function call.

	new ArgumentError(argumentName)

__Arguments__

* `argumentName` - the name of the argument that has a problem

```js
// Example
throw new errors.Argument('username');
```

---------------------------------------

<a name="argumentnull" />
### ArgumentNullError

Applicable when an argument received by a function call is null/undefined or empty.

	new ArgumentNullError(argumentName)

__Arguments__

* `argumentName` - the name of the argument that is null

```js
// Example
throw new errors.ArgumentNull('username');
```

---------------------------------------

<a name="authrequired" />
### AuthenticationRequiredError

Applicable when an operation requires authentication

	new AuthenticationRequiredError(message)

__Arguments__

* `message` - any message

```js
// Example
throw new errors.AuthenticationRequiredError("Please provide authentication.")
```

---------------------------------------

<a name="generic" />
### GenericError

Applicable for any error returned by a callback, or any time you want to throw a new error that is based from another error.
Call stacks from both errors will be concatenated for a full call stack.  This effectively patches a design issue in JavaScript
where logging an error from an asynchronous callback will show only the call stack from the error's context, but does not
show the the stack where it was consumed.
For example, if you perform a SQL query that returns an error with the callback, you don't know where in *your* `code` the offending
query was generated.  Wrapping the returned error in your own GenericError will solve this problem.

	new GenericError(message[, innerError])

__Arguments__

* `message` - any message you want
* `innerError` - any error that you want to preserve with the new error

```js
// Example
mysql.query('SELECT * `FROM` users', function(err, results){
	if(err) return new errors.Generic("Had trouble retrieving users.", err);
	console.log(results);
})
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
throw new errors.HttpStatus("Not Found", 404);
```

	new HttpStatusError(err[, req])

Figure out a proper status code and message from a given error.
To change the mappings, modify `HttpStatusError.message_map` and `HttpStatusError.code_map`

__Arguments__

* `err` - any Error subclass
* `req` - the request object



```js
// Example
throw new errors.HttpStatus("Not Found", 404);
```

---------------------------------------

<a name="notpermitted" />
### NotPermittedError

Applicable when an operation is not permitted

	new NotPermittedError(message)

__Arguments__

* `message` - any message

```js
// Example
throw new errors.NotPermitted("username cannot be changed once set.")
```

---------------------------------------

<a name="notsupported" />
### NotSupportedError

Applicable when a certain condition is not supported by your application.

	new NotSupportedError(message)

__Arguments__

* `message` - a message

```js
// Example
throw new errors.NotSupported('Zero values');
```

---------------------------------------

<a name="validation" />
### ValidationError

Useful for denoting a problem with a user-defined value.  Generally, you wont throw this error.

	new ValidationError(message[, code])

__Arguments__

* `message` - any message
* `code` - an optional error code

```js
// Example
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




