//Routes users
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app){
    app.route('/user')
        //POST /user -> users.create()
        .post(users.create)
        //GET /user -> users.list()
        .get(users.list);

    app.route('/user/:userId')
        //GET /user/[id] -> users.read()
        .get(users.read)
        //PUT /user/[id] -> users.update()
        .put(users.update)
        //DELETE /user/[id] -> users.delete()
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
