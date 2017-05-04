var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost:27017/passportapp', function(req,res){
    console.log('Database connected');
});
//Express Session

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Initialize middleware
app.use(passport.initialize());
app.use(passport.session());

//Express messages

app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
    next();
});


//Express Validator from github

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', index);
//app.use('/users', users);

app.listen(port , function(request, response, next){
    console.log('Server started on ' +port);
});