process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var database = require('./config/database'),
    express = require('./config/express');


var db = database();
var app = express();

var port = process.argv[2];
app.listen(port);
console.log('Server is running. Listening to port ' + port);
