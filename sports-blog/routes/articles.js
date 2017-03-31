var express = require('express');
var router = express.Router();
var Article = require('../models/article.js');
var Category = require('../models/categories.js');

router.get('/', function(req,res){
  res.render('articles', {title: 'Articles'});
});

router.get('/show/:id', function(req,res){
  res.render('article', {title: 'Article'});
});

router.get('/category/:category_id', function(req,res){
  res.render('articles', {title: 'Category Articles'});
});

router.post('/add', function(req,res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('subtitle', 'Subtitle is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();

  var errors = req.validationErrors();

  if(errors)
  {
    Category.getCategories(function(err, categories){
      res.render('add_article',{
        errors: errors,
        title: 'Create Article',
        categories: categories
      });
    });
  }
  else {
    var article = new Article();
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    article.body = req.body.body;
    article.author = req.body.author;

    Article.addArticle(article, function(err,article){
      if(err)
      {
        res.send(err);
      }
    req.flash('success', 'Article Saved');
    res.redirect('/manage/articles');
    });
  }
});

router.post('/edit/:id', function(req,res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('subtitle', 'Subtitle is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();

  var errors = req.validationErrors();

  if(errors)
  {
    Category.getCategories(function(err, categories){
      res.render('edit_article',{
        errors: errors,
        title: 'Edit Article',
        categories: categories
      });
    });
  }
  else {
    var article = new Article();
    var query = {_id: req.params.id};
    var update = {
      title : req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      author: req.body.author,
      body: req.body.body
    }
    Article.updateArticle(query, update, {}, function(err, article){
      if(err)
      {
        res.send(err);
      }
      req.flash('success', 'Article Updated');
      res.redirect('/manage/articles');

    });
  }


});

//Delete an Article
router.delete('/delete/:id', function(req,res,next){
  var article = new Article();
  var query = { _id : req.params.id};
  Article.removeArticle(query, function(err, article){
    if(err)
    {throw err;}
    res.status(200);
  });
});

module.exports = router;
