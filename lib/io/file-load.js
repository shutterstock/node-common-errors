var generateClass = require('../helpers/class-generator');
module.exports = generateClass("FileLoadError", {
  args: ['file_name', 'inner_error'],
  extends: require('./io'),
  generateMessage: function(){
    return "Unable to load file: " + this.file_name;
  }
});
