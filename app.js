var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){

	socket.on('loadChatList', function(userId){
		socket.room = userId;
		socket.join(userId);
		socket.emit('appendChatList');
	});

	socket.on('loadChatMessages', function(userId){
		socket.emit('appendChatMessages',userId);
	});

	socket.on('postMessage', function(msgData){
		io.to(msgData.receiver).emit('getMessage',msgData);
	});

	socket.on('disconnect', function(){

    });

	socket.on('conn', function(){
		console.log('connect');
	});
});

http.listen(3300, function(){
  console.log('listening on *:3300');
});