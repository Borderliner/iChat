 var express = require('express');
 var morgan = require('morgan');
 var bodyParser = require('body-parser');
 var compress = require('compression');
 var methodOverride = require('method-override');

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

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    require('../app/routes/index.server.routes')(app);
    return app;
 };
