//Requirements
var User = require('mongoose').model('User'),
    passport = require('passport');

//Gets an error code and retrieves the message
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

//Renders Sign In page
exports.renderSignIn = function(req, res, next){
    //Show this page only if user is NOT logged in
    if(!req.user){
        res.render('pages/signin', {
            //Pass flash notifications as messages
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        //Redirect to Home if logged in
        return res.redirect('/');
    }
};

//Renders Sign Up page
exports.renderSignUp = function(req, res, next){
    //Show this page only if user is NOT logged in
    if(!req.user){
        res.render('pages/signup', {
            //Pass flash notifications as messages
            messages: req.flash('error')
        });
    } else {
        //Redirect to Home if logged in
        return res.redirect('/');
    }
};

//Actual Sign Up function
exports.signup = function(req, res, next){
    //Do not sign up if a user is currently logged in
    if(!req.user){
        //Creates a User out of request's body
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';
        user.save(function(err){
            if(err){
                //Send err to getErrorMessage to extract messages from error code
                message = getErrorMessage(err);
                //Fill the flash with error message
                req.flash('error', message);
                //Return to signup page if error occurs
                return res.redirect('/signup');
            }
            //Login user after sign up
            req.login(user, function(err){
                if(err){
                    return next(err);
                }
                //And return it to homepage
                return res.redirect('/');
            });
        });
    } else {
        //Return to homepage if already signed in
        return res.redirect('/');
    }
};

//Sign Out action
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
            User.findById(req.user.id, function(err, foundUser){
                res.json(foundUser);
            });
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
