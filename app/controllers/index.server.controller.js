exports.render = function(req, res){
    //Outputs or saves users last visit
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    else{
        req.session.lastVisit = new Date(Date.now());
    }
    //Renders index.jade
    res.render('index', {
        title: "Welcome!", //Passes title variable to index.jade
        userFullName: req.user ? req.user.fullName : '',
        user: JSON.stringify(req.user);
    });
};
