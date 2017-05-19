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
    
    //Add Movie Post
    
    router.post('/add', function(req,res){
        
        req.checkBody('title', 'Title is required').notEmpty();
        
        var errors = req.validationErrors();
        
        if(errors){
            res.render('addmovies', {errors: errors});
        }
        else{
            
            var title = req.body.title && req.body.title.trim();
            var release_date = req.body.release_date && req.body.release_date.trim();
            var genre = req.body.genre && req.body.genre.trim();
            var director = req.body.director && req.body.director.trim();
            var plot = req.body.plot && req.body.plot.trim();
            var trailer = req.body.trailer && req.body.trailer.trim();
            var cover = req.body.cover && req.body.cover.trim();
            
            
            var newMovie = new Movie({
                title: title,
                release_date :release_date,
                genre: genre,
                director: director,
                plot: plot,
                trailer: trailer,
                cover: cover
                
                
            });
            
            newMovie.save(function(err, movie){
                if(err){
                    res.send(err);
                }
                res.redirect('/movies');
            });
            
           
        }
        
    });
    
    
    //Details page
    
    router.get('/details/:id',  function(req,res){
       Movie.findOne({_id: req.params.id}, function(err, movie){
          if(err)
              {
                  res.send(err);
              }
           res.render('details',{movie: movie});
       }); 
        
    });
    
    //Delete a movie
    
    router.delete('/delete/:id', function(req,res){
       
        Movie.findByIdAndRemove({_id: req.params.id}, function(err){
           
            if(err){
                res.send(err);
            }
            res.status(204).send();
        });
        
    });
    
    //Edit a Movie
    router.get('/edit/:id', function(req,res){
       
        Movie.findOne({_id: req.params.id}, function(err,movie){
            if(err){
                res.send(err);
            }
            res.render('editmovie', {movie: movie});
        });
        
        
        
    });
    
    
    //Update movie details
    
    router.post('/edit/:id', function(req,res){
        
        req.checkBody('title', 'Title is required').notEmpty();
        
        var errors = req.validationErrors();
        
        if(errors){
            
              Movie.findOne({_id: req.params.id}, function(err,movie){
            if(err){
                res.send(err);
            }
            res.render('editmovie', {err: err, movie: movie});
        });
        
        }
        else{
            
            var title = req.body.title && req.body.title.trim();
            var release_date = req.body.release_date && req.body.release_date.trim();
            var genre = req.body.genre && req.body.genre.trim();
            var director = req.body.director && req.body.director.trim();
            var plot = req.body.plot && req.body.plot.trim();
            var trailer = req.body.trailer && req.body.trailer.trim();
            var cover = req.body.cover && req.body.cover.trim();
            
            
            var updateMovie = {
                title: title,
                release_date :release_date,
                genre: genre,
                director: director,
                plot: plot,
                trailer: trailer,
                cover: cover    
            };
            
            Movie.update({_id: req.params.id},updateMovie, function(err, movie){
                if(err){
                    res.send(err);
                }
                res.redirect('/movies');
            });
            
           
        }
        
    });
    
    
    //Search Movies
    
    router.post('/search', function(req, res){
       Movie.search(req.body.searchText,{title: 1, plot: 1, cover: 1}, {
           conditions: {title:{$exists: true}, plot: {$exists: true},  cover:{$exists: true}},
           sort: {title: 1}, 
           limit: 10
       }, function(err,movies){
           if(err){
               res.send(err);
           }
           
           var model = {
               movies: movies.results
           }
           res.render('movies', model);
       });
    });
    
    router.get('/genre/:genre', function(req,res){
       Movie.find({genre: req.params.genre}, function(err, movies){
          
           if(err){
               res.send(err);
           }
           
           var model = {
               movies: movies
           }
           
           res.render('movies', model);
       });
        
        
    });
    
};
