const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');
const bodyParser = require('body-parser');

router.get('/', (req,res) => {

  Todos.find({}, function(err,todos){
    if(err) throw err;
    //console.log(todos);
    res.render('index', {
      todos: todos
    });
  });

});

router.post('/todo/add' , (req,res) => {

var todo = new Todos({
  text : req.body.text,
  body : req.body.body
});


  todo.save((err, results) => {
      if(err)
      {
        return err;
      }
      res.redirect('/');
  });

});

module.exports = router;
