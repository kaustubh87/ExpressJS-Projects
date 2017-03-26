var express = require('express');
var router = express.Router();

var Category = require('../models/categories.js');

router.get('/articles', function(req,res){
    res.render('manage_articles', {title: 'Manage Articles'});
});

router.get('/categories', function(req,res){

  Category.getCategories(function(err, categories){

    if(err)
    {
      throw err;
    }
    res.render('manage_category' , {
      title: 'Manage Categories',
      categories: categories
    });
  });

});

router.get('/articles/add', function(req,res){
  res.render('add_article', {title: 'Create Article'});
});

router.get('/categories/add', function(req,res){
  res.render('add_category', {title: 'Create Category'});
});

router.get('/articles/edit/:id', function(req,res){
  res.render('edit_article', {title: 'Edit Article'});
});

router.get('/categories/edit/:id', function(req,res){
  Category.getCategoryById(req.params.id, function(err, category){
    if(err)
    {
      throw err;
    }
    res.render('edit_category', {
      title: 'Edit Category',
      category: category
    });
  });

});

module.exports = router;
