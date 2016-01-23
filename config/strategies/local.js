//Local Strategy for passport authentication
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    /*Uses passport.use() to set a new LocalStrategy
     * done() is a function to report the results
     */
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({username: username}, function(err, user){
            //If error occurs...
            if(err){
                return done(err);
            }
            //If user not found...
            if(!user){
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            //If password is wrong... This uses authenticate() static method
            if(!user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            //Otherwise, return user object
            return done(null, user);
        });
    }));
}
