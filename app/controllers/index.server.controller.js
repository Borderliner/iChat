exports.render = function(req, res){
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    else{
        req.session.lastVisit = new Date(Date.now());
    }
    res.render('index', {
        title: "Hello World!"
    });
};
