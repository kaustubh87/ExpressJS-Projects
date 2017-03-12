var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var todoSchema = new Schema({
  text: {
    type: String

  },
  body:{
    type: String
    
  }

});
var Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos;
