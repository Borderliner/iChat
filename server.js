process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var database = require('./config/database'),
    express = require('./config/express'),
    passport = require('./config/passport');


var db = database();
var app = express();
var passport = passport();

var port = process.argv[2];
app.listen(port);
console.log('Server is running. Listening to port ' + port);
