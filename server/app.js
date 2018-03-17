var express = require('express');
var socket = require('socket.io');

var app = express();
const PORT = 8080;

var server = app.listen(PORT, function(){
    console.log('server is running on port ' + PORT)
});

var io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        // socket.broadcast.emit('RECEIVE_MESSAGE', data);
        io.emit('RECEIVE_MESSAGE', data);
    });
});
