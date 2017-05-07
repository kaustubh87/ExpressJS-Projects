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

//PUT request

app.put('/api/clients/:id' , function(req,res){
    
    var id = req.params.id;
    
   db.clients.findAndModify({query: {_id : mongojs.ObjectId(id)},
       update: {
        $set : {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
        }},
       new: true},
        function(err, client){
    if(err)
        {
        res.json(err);
        }
    else
        res.json(client);
    
});
});


//Delete request

app.delete('/api/clients/:id', function(req,res){
   var id = req.params.id;
    db.clients.remove({_id: mongojs.ObjectId(id)},function(err, client){
       if(err){
           res.send(err);
       }
        res.json(client);
    });
});

app.listen(port, function(req,res){
    console.log('Server started on '+port);
});


