var express = require('express');
var router = express.Router();

router.get('/manage', function(req,res){
  res.send('MANAGE');
});

router.get('/articles/add', function(req,res,next){
  res.render('add_article', {title: 'Create Article'});
});

router.get('/categories/add', function(req,res,next){
  res.render('add_category', {title: 'Create Category'});
});

module.exports = router;
