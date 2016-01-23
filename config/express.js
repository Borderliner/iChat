var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    var passport = require('passport');

module.exports = function(){
    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }
    else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    app.set('views', './app/views');
    app.set('view engine', 'jade');

    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    app.use(express.static('./public'));
    return app;
};
