//Routes * to 404.jade
module.exports = function(app){
    app.get('/[^(/lib)]*/', function(req, res){
        res.status(404);
        res.render('pages/404');
    });
}
