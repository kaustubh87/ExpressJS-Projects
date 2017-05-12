'use strict';

var Movie = require('../models/movies');


module.exports = function (router) {

    var model = new Movie();
    
    //Movie Listing
    router.get('/', function (req, res) {
        
        Movie.find({}, function(err, movies){
           if(err) res.send(err);
            
            var model = {
                movies: movies
            }
            
        res.render('movies', model);
            
        });
        
        
        
        
    });
    
    
    //Add Movies
    
    router.get('/add', function(req,res){
       
        res.render('addmovies');
        
    });
    
    
    
    

};
