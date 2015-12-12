process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();

var port = process.argv[2];
app.listen(port);
console.log('Server is running. Listening to port ' + port);
