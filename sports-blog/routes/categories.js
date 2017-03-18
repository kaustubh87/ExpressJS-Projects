var express = require('express');
var router = express.Router();

router.get('/categories', function(req,res){
  res.send('CATEGORIES');
});

module.exports = router;
