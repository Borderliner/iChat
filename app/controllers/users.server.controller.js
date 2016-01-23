//Requirements
var User = require('mongoose').model('User');

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
