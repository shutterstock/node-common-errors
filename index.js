module.exports = {
  Validation: require('./lib/validation'),
  Generic: require('./lib/generic')
};

module.exports.logError = function(err, cb) { 
  if(!err.isLogged) { 
    err.isLogged = true; 
    console.error(err); 
  } 
  if(cb) cb(err); 
};