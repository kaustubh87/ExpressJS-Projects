const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todo-app';


const app = express();
const port = 4321;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

MongoClient.connect(url, (err, database) =>{
    console.log('MongoDB Connected...');
    if(err) throw err;

    db = database;
    Todos = db.collection('todos');

    app.listen(port, () => {
      console.log('Server running on port ' +port);
    });
});

app.get('/', (req,res,next) => {
  Todos.find({}).toArray((err, todos) => {
    if(err) throw err;
    res.render('index');
  });
});
