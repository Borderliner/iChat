//Routes users
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app){
    app.route('/users')
        //POST /users -> users.create()
        .post(users.create)
        //GET /users -> users.list()
        .get(users.list);

    app.route('/users/:userId')
        //GET /users/[id] -> users.read()
        .get(users.read)
        //PUT /users/[id] -> users.update()
        .put(users.update)
        //DELETE /users/[id] -> users.delete()
        .delete(users.delete);

    //Fills the userId part of URL with the content returned by users.userById
    app.param('userId', users.userById);

    app.route('/signup')
        .get(users.renderSignUp)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignIn)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.route('/signout')
        .get(users.signout);
};
