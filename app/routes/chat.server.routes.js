//Routes /chat to chat.render()
module.exports = function(app){
    var chat = require('../controllers/chat.server.controller.js');
    app.get('/chat', chat.render);
}
