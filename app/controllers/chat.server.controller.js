exports.render = function(req, res){
    res.render('chat', {
        title: 'iChat Main Room',
        userObject: req.user
    });
};