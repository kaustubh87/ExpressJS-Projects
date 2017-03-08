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

router.delete('/todo/delete/:id', (req,res) => {
    const id = req.params.id;
    Todos.findOneAndRemove(id, (err, response) =>{
      if(err)
      {
        throw err;
      }
      console.log('Todo Deleted');
      res.send(200);
    });
});

router.get('/todo/edit/:id', (req,res, next) => {
    const id = req.params.id;
    Todos.findById(id, (err,todo) =>{
        if (err) {
          throw err;
        }
        res.render('edit',{
          todo: todo
        });
    });

    });

    router.post('/todo/edit/:id' , (req,res) => {

    const id = req.params.id;
    var todo = new Todos({
      text : req.body.text,
      body : req.body.body
    });

    Todos.findByIdAndUpdate(id, {$set : {todos: todo}}, (err, todos) => {
        if(err)
        {
          throw err;
        }
        res.redirect('/');
    });
  });

module.exports = router;
