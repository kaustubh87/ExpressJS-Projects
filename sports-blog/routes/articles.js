var express = require('express');
var router = express.Router();
var Article = require('../models/Articles.js');

router.get('/', function(req,res){
  res.render('articles', {title: 'Articles'});
});

router.get('/show/:id', function(req,res){
  res.render('article', {title: 'Article'});
});

router.get('/category/:category_id', function(req,res){
  res.render('articles', {title: 'Category Articles'});
});

router.post('/articles/add', function(req,res){
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
  res.redirect('/manage/articles');
  });
});

module.exports = router;
