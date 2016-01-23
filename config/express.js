//Requirements
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');

/* This file, modifies the express() object, and passes it along to the
 * server.js file. It basically adds middlewares along the requests and
 * responses, and sets the template engine.
 */
module.exports = function(){
    var app = express();

    //Formats the requests and logs them on output
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }
    //Compresses data
    else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    //Parses body to and converts it to JSON
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    //Express-session initialization
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //Sets /app/views as the default folder for view files
    app.set('views', './app/views');
    //Sets the templating engine to Jade
    app.set('view engine', 'jade');

    //Initializes passport for authentication
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    //Registers routes to express
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    //Sets public folder to /public, which holds client-side files
    app.use(express.static('./public'));

    //Returns the modified object
    return app;
};
