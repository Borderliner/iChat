//Set the NODE_ENV environment variable to 'development', IF NOT SET BY OS
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Requirements
var database = require('./config/database'),
    express = require('./config/express'),
    passport = require('./config/passport');

//Initialization
var db = database();
var app = express();
var passport = passport();

/* Set the application port to the first argument
 *    Example: node server.js 3000
 *    This will run the app on port 3000
 */
var port = process.argv[2] | 4500;
app.listen(port);
console.log('Server is running. Listening to port ' + port);

module.exports = app;
