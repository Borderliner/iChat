exports.render = function(req, res){
    //If a session is going on, save the user and pass it to pages/chat template
    req.session.user = req.user ? req.user : null;
    res.render('pages/chat', {
        userObject: req.user,
        userUsername: req.session.user ? req.session.user.username : ''
    });
};
