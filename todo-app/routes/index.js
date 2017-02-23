var express = require('express');
var router = express.Router();
var Todos = require('../models/Todos');

router.get('/', (req,res) => {

  Todos.find({}, function(err,todos){
    if(err) throw err;
    //console.log(todos);
    res.render('index', {
      todos: todos
    });
  });

});

module.exports = router;
