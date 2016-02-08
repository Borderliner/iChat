module.exports = function(io){
    var fs = require('fs');

    io.on('connection', function(socket){
        
        socket.on('user connected', function(data){
            io.emit('user broadcast', {
                username: data.username
            });
        });

        socket.on('disconnect', function(){
            console.log('Someone disconnected');
        });

        socket.on('chat message', function(data){
            console.log(data.username + ': ' + data.message);
            //Log all chats
            var today = new Date();
            today = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
            fs.appendFile('./public/chat_logs/' + today + '.log',
                data.username + ': ' + data.message + '\n',
                'utf-8',
                function(err){
                    if(err) throw err;
                });

            io.emit('global chat message', {
                username: data.username,
                message: data.message
            });
        });
    });
};
