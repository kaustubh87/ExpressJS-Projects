var express = require('express');
var router = express.Router();

router.get('/articles', function(req,res){
  res.send('Articles');
});

module.exports = router;
