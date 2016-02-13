var msg_appender = function(msg, options){
    if(options.server == true)
        $('#messages').append('<li class="server-message">' + msg + '</li>');
    else
        $('#messages').append('<li>' + msg + '</li>');
    $('div.messageBoard').scrollTop($('div.messageBoard')[0].scrollHeight);
};

var user_appender = function(userList){
    userList.forEach(function(item, index, array){
        $('#userslist').append('<li id="' + item + '">' + item + '</li>');
    });
};

var user_remover = function(){
    $('#userslist li').remove();
};

var cur_username = $('#userUsername').html();

var socket = io();
socket.on('connect', function(){
    socket.emit('user connected', {
        username: cur_username
    });
});


$('form').submit(function(){
    var message = $('#message').val();
    socket.emit('chat message', {
        username: cur_username,
        message: message
    });
    $('#message').val('');
    return false;
});

socket.on('user broadcast', function(data){
    msg_appender('<i>--> <b>'+data.username +'</b> connected to the server!</i>', {server: true});
    user_remover();
    user_appender(data.userList);
    $('#online-users').html('Online Users (' + data.onlineUsers + ')');
});

socket.on('global chat message', function(data){
    msg_appender('<b>' + data.username + '</b>: ' + data.message, {server: false});
});

socket.on('gonna disconnect', function(){
    socket.emit('disconnect him', {
        username: cur_username
    });
});

socket.on('user disconnected', function(data){
    msg_appender('<i>--> <b>'+ data.username +'</b> disconnected from the server!</i>', {server: true});
    user_remover();
    user_appender(data.userList);
    $('#online-users').html('Online Users (' + data.onlineUsers + ')');
});

socket.on('global user disconnect', function(data){
    msg_appender('<i>--> <b>'+ data.username +'</b> disconnected from server!</i>', {server: true});
});

$(document).ready(function(){
    $('.button-collapse').sideNav();
});
