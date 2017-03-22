var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  res.render('articles', {title: 'Articles'});
});

router.get('/show/:id', function(req,res){
  res.render('article', {title: 'Article'});
});

router.get('/category/:category_id', function(req,res){
  res.render('articles', {title: 'Category Articles'});
});

module.exports = router;
