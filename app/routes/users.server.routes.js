//Routes users
var users = require('../../app/controllers/users.server.controller');

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
};
