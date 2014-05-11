var generateClass = require('../helpers/class-generator');
module.exports = generateClass("FileNotFoundError", {
  args: ['file_name', 'inner_error'],
  extends: require('./io'),
  generateMessage: function(){
    return "File not found: " + this.file_name;
  }
});
