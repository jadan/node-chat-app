//server side javascript

const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const publicPath = path.join(__dirname, '../public'); 

const  port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);

//communicate between server and client
var io = socketIO(server);

io.on('connection', (socket)=>{
	console.log('New user connected.');

	// socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom'));
	
	// socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));

	socket.on('disconnect', ()=>console.log('User was diconnected.'));

	socket.on('join', (params, callback) =>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are required.');
		}

		socket.join(params.room);
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (message, callback)=> {
		console.log(message);
		//socket.emit to single connection, io.emit to every connection
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', 
		(coords) => {
			io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
});



//Middleware (express) Third-party add-on. 
app.use(express.static(publicPath));

server.listen(port, ()=>{console.log(`Server is up on port ${port}.`)});