var express = require('express');
var router = express.Router();

router.get('/manage', function(req,res){
  res.send('MANAGE');
});

module.exports = router;
