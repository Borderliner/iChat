exports.render = function(req, res){
    req.session.user = req.user ? req.user : null;
    res.render('chat', {
        title: 'Main Chat Room',
        userObject: req.user,
        userUsername: req.session.user ? req.session.user.username : ''
    });
};