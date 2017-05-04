var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/passportapp');

var bcrypt = require('bcryptjs');

//User Schema

var UserSchema = mongoose.Schema({
   name: {
       type: String
   },
    username:{
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function(newUser, user){
    bcrypt.genSalt(10, (function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
           if(err){
               console.log(err);
           } 
            newUser.password = hash;
            newUser.save(user);
        });
    }));
}


module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, user){
    User.findById(id, user);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) 
    {
        throw err;
    }
    callback(null, isMatch);
  });
}

