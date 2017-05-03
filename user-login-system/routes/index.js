var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
   res.render('index'); 
});


router.get('/register', function(req,res,next){
   res.render('register');
});

router.post('/register', function(req,res,next){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    req.checkBody('name' , 'Name field is required').notEmpty();
    req.checkBody('email' , 'Email field is required').notEmpty();
    req.checkBody('email' , 'Email must be a valid email address').isEmail();
    req.checkBody('username' , 'Username is required').notEmpty();
    req.checkBody('password' , 'Password is required').notEmpty();
    req.checkBody('password2' , 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validateErrors();
    if(errors){
        res.render('register',{
            errors: errors
        });
    }
    else
        {
            console.log('Success');
            return;
        }
  
});

module.exports = router;