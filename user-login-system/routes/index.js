var express = require('express');
var router = express.Router();

var User = require('../models/user');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', ensureAuthenticated, function(req,res,next){
   res.render('index'); 
});

router.get('/register', function(req,res,next){
   res.render('register');
});

router.get('/login', function(req,res,next){
   res.render('login');
});


router.get('/home', function(req,res,next){
   res.render('home'); 
});

router.get('/logout', function(req,res,next){
   req.logout();
   req.flash('success_msg', 'You are logged out');
   res.redirect('/login');
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
  
            var newUser = new User({
                name: name,
                username: username,
                email: email,
                password: password
            });
            
            User.registerUser(newUser, function(err, user){
                if(err){
                    throw err;
                }
                else{
                    req.flash('success_msg', 'You are registered and can login');
                    res.redirect('/login');
                }
            });
        
  
});

//Local Strategy

// Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'No user found'});
    }

    User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Wrong Password'});
      }
    });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


//Login

router.post('/login', function(req,res,next){
    passport.authenticate('local', {
       successRedirect : '/home',
       failureRedirect : '/login',
       failureFlash : true
    })(req, res, next);
});


//Access Control

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error_msg', 'You are not authorized to view that page');
        res.redirect('/login');
    }
}

module.exports = router;