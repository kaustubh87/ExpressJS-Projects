var express = require('express');
var router = express.Router();

var Category = require('../models/categories.js');

router.get('/', function(req,res){
  Category.getCategories(function(err, categories){
      console.log(categories);
      res.render('categories', {title: 'Categories'});
  });

});

module.exports = router;
