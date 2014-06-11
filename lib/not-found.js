var generateClass = require('./helpers/class-generator');
module.exports = generateClass("NotFoundError", {
  args: ['entity_name', 'inner_error'],
  generateMessage: function(){
    return 'Not Found: "' + this.entity_name + '"';
  }
})
