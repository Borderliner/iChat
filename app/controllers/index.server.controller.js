exports.render = function(req, res){
    //Outputs or saves users last visit
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    else{
        req.session.lastVisit = new Date(Date.now());
    }
    //Renders index.jade
    res.render('pages/index', {
        userFullName: req.user ? req.user.fullName : '',
        userObject: JSON.stringify(req.user),
    });
};
