//Requirements
var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
    var User = mongoose.model('User');

    //Saves user.id in session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    //Retrieves user from it's ID saved in session
    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}, '-password -salt', function(err, user){
            done(err, user);
        });
    });

    //Registers this strategy to passport
    require('./strategies/local')();
};
