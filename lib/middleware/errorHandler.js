var HttpStatusError = require('../http-status');

module.exports = function errorHandler(err, req, res, next){
  if(!err) {
    if(next) return next();
    else return res.end();
  }

  err = new HttpStatusError(err, req);
  if(err.status_code >= 500) {
    console.error(err.stack);
    err.message = HttpStatusError.message_map[500]; //hide the real error from user agent.
  }

  res.status(err.status_code).send(err.message);
}
