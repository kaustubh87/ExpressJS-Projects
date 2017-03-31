var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var port = 3000;
var flash = require('connect-flash');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sportsblog');

var db = mongoose.connection;


var app = express();

var index = require('./routes/index');
var articles = require('./routes/articles');
var categories = require('./routes/categories');
var manage = require('./routes/manage');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.locals.moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.messages = require('express-messages')(req,res);
  next();

});

//Express Vaidator

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
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port, function(req,res){
  console.log('Server running at ' +port);

});
