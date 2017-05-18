var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var api = require('instagram-node').instagram();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}));

app.use(function(req,res,next){
        if(req.session.accesstoken && req.session.accesstoken != 'undefined'){
    res.locals.isLoggedIn = true;
}
else{
    res.locals.isLoggedIn = false;
}
    
    next();
});



api.use({
    client_id :'1caecf6d65d8452e812ea6d354f4410b',
    client_secret:'3122d823f6824704ac557415e769db5d'
});

var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req,res){
  res.redirect(api.get_authorization_url(redirect_uri, {scope: ['likes'], state: 'a state'}));  
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
        /*
      console.log('Access Token ' + result.access_token);
        console.log('User ID ' + result.user.id);
      res.send('You made it!!');
      */
        req.session.accesstoken = result.access_token;
        req.session.uid = result.user.id;
        
        api.use({
            access_token: req.session.accesstoken
        });
        
        res.redirect('/main');
    }
  });
};

//Index Route

app.get('/', function(req,res,next){
    res.render('index', {title : 'Welcome'})
    
});




//Main Route

app.get('/main', function(req,res,next){
    api.user(req.session.uid, function(err, result, remaining, limit){
        console.log(result);
        if(err)
            {
                res.send(err);
            }
        //Fetch media content
        api.user_media_recent(req.session.uid, {}, function(err,medias,pagination,remaining,limit){
            if(err){
                res.send(err);
            }
             res.render('main', 
            {
            title: 'My Instagram',
            user: result,
            medias: medias
            });
        });
       
    });
    
});

//Login Route

app.get('/login', exports.authorize_user);

//Logout Route

app.get('/logout', function(req,res,next){
    
    req.session.accesstoken = false;
    req.session.uid = false;
    res.redirect('/');
});

// Handle Auth

app.get('/handleauth', exports.handleauth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
