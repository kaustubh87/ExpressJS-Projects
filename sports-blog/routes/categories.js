var express = require('express');
var router = express.Router();

var Category = require('../models/categories.js');

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

module.exports = router;
