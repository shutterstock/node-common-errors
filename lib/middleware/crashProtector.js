module.exports = function (errorHandler){
  return function crashProtector(req, res, next) {
    var domain = require('domain'); //require only if needed, because "Due to their experimental nature, the Domains features are disabled unless the domain module is loaded at least once."
    var d = domain.create();
    d.on('error', function(err){ 
      console.error("Fatal crash protected!");
      d.dispose();
      if(res.finished || Object.keys(res._headers).length) {
        console.error(err && err.stack);
        return res.end();
      } 
      if(errorHandler) errorHandler(err, req, res);
      else next(err);
    });
    d.run(next);
  }
}

var findErrorHandler = function(app){
  try {
    var errorHandler;
    var foundRouter = false;
    for(var i=0; i<app.stack; i++){
      var middleware = app.stack[i];
      if(foundRouter && middleware.handle.length >= 4) {
        errorHandler = middleware;
        break;
      } else if(app.router === middleware.handle) foundRouter = true;
    }
    return errorHandler;
  } catch(e) {
    console.error("Crash protector error", e);
  }
}