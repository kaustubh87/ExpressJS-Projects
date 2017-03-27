var express = require('express');
var router = express.Router();

var Category = require('../models/categories.js');

//Add Category and Post
router.get('/', function(req,res){
  Category.getCategories(function(err, categories){
      console.log(categories);
      if(err){
        res.send(err);
      }

      res.render('categories', {
        title: 'Categories',
        categories: categories
      });
  });

});

router.post('/add', function(req,res,next){
  var category = new Category();
  category.title = req.body.title;
  category.description = req.body.description;

  Category.addCategory(category, function(err,category){
    if(err)
    {
      res.send(err);
    }
  res.redirect('/manage/categories');
  });
});

//Edit Category and Save Post
router.post('/edit/:id', function(req,res,next){
  var category = new Category();
  var query = {_id: req.params.id};
  var update = {
    title: req.body.title,
    description: req.body.description
  };

  Category.updateCategory(query, update, {}, function(err,category){
    if(err)
    {
      res.send(err);
    }
  res.redirect('/manage/categories');
  });
});

//Delete Category

router.delete('/delete/:id' , function(req,res,next){
  var query = {_id : req.params.id}

  Category.removeCategory(query, function(err, category){
    if(err)
    {
      res.send(err);
    }
    res.status(200);
  });

});

module.exports = router;
