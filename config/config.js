//Exports a setting based on NODE_ENV from /config/env folder to server.js
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
