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

module.exports = mongoose.model('User', UserSchema);

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

