//Requirements
var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err){
    var message = '';

    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong. Report the issue please';
                break;
        }
    } else {
        for(var errName in err.errors){
            if(err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};

exports.renderSignIn = function(req, res, next){
    if(!req.user){
        res.render('signin', {
            title: 'Sign-In Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignUp = function(req, res, next){
    if(!req.user){
        res.render('signup', {
            title: 'Sign-Up Form',
            messages: req.flash('error')
        });
    }
};

exports.signup = function(req, res, next){
    if(!req.user){
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';
        user.save(function(err){
            if(err){
                message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function(err){
                if(err){
                    return next(err);
                }
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res){
    req.logout();
    res.redirect('/');
};

//Create new users
exports.create = function(req, res, next){
    var user = new User(req.body);
    user.updated = Date.now();

    //Saves user to database
    user.save(function(err){
        if(err){
            return(next(err));
        }
        else{
            //And outputs the saved user's info as JSON
            res.json(user);
        }
    });
};

//List all users
exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if(err){
            return(next(err));
        }
        else{
            //Prints all users as JSON
            res.json(users);
        }
    });
};

//Outputs the user found by userById()
exports.read = function(req, res){
    res.json(req.user);
};

//A middleware function to find a user from it's ID
exports.userById = function(req, res, next, id){
    User.findOne({
        _id: id
    }, function(err, user){
        if(err){
            return(next(err));
        }
        else{
            //It fills the req.user with the found user
            req.user = user;
            //Go to the next middleware
            next();
        }
    });
};

//Updates user found by userById()
exports.update = function(req, res, next){
    //Sets the updated field to the current Date
    req.body.updated = Date.now();
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if(err){
            return(next(err));
        }
        else {
            //Returns the newly updated user's info as JSON
            res.json(user);
        }
    });
};

//Deletes a user found by userById()
exports.delete = function(req, res, next){
    req.user.remove(function(err){
        if(err){
            return(next(err));
        }
        else {
            //Returns the deleted user's info as JSON
            res.json(req.user);
        }
    });
};
