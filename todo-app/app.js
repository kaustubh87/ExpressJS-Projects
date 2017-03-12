const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todos = require('./models/Todos');
var index = require('./routes/index');

const url = "mongodb://localhost:27017/todoapp";
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to database'));

db.once('open', function(){
  console.log('Connected correctly to server');

});

const app = express();
const port = 3890;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);

app.listen(port, () => {
  console.log('Server running on port ' +port);
});
