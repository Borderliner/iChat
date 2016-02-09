module.exports = function(io){
    var fs = require('fs');

    io.on('connection', function(socket){
        var username = null;
        var onlineUsers = 0;
        var userList = [];
        socket.on('user connected', function(data){
            username = data.username;
            userList.push(data.username);
            onlineUsers++;
            io.emit('user broadcast', {
                username: data.username,
                userList: userList,
                onlineUsers: onlineUsers
            });
        });

        socket.on('disconnect', function(){
            userList = userList.splice(userList.indexOf(username), 1);
            onlineUsers--;
            io.emit('user disconnected', {
                username: username,
                userList: userList,
                onlineUsers: onlineUsers
            });
            console.log(username + ' disconnected!');
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
