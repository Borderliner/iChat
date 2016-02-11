//Routes * to 404.jade
module.exports = function(app){
    //Regex to match any URL except ones that start with /lib
    app.get('/[^(/lib)]*/', function(req, res){
        res.status(404);
        res.render('pages/404');
    });
}
