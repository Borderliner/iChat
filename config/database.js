var config = require('./config'),
    mongoose = require('mongoose');

module.exports = {
    var db = mongoose.connect(config.db);
    return db;
};
