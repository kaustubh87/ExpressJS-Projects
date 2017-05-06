var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.port || 3000;
var app = express();
var mongojs = require('mongojs');

var db = mongojs('clientkeeper', ['clients']);

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send(' Please use /api/clients as url');
});

app.get('/api/clients' , function(req,res){
   db.clients.find().sort({first_name: 1}, function(err,clients){
       if(err){
           res.send(err);
       }
       else{
           res.json(clients);
       }
       
   });
});


app.post('/api/clients' , function(req,res){
   db.clients.insert(req.body, function(err, client){
       if(err){
           res.send(err);
       }
       res.json(client);
   }); 
});

app.listen(port, function(req,res){
    console.log('Server started on '+port);
});


