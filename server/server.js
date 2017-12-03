//server side javascript

const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');


const publicPath = path.join(__dirname, '../public'); 

const  port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);

//communicate between server and client
var io = socketIO(server);

io.on('connection', (socket)=>{
	console.log('New user connected.');

	// socket.emit('newMessage', {
	// 	from: 'mike@example.com',
	// 	text: 'hey what\'s going on!',
	// 	createAt: 123
	// });

	socket.on('disconnect', ()=>console.log('User was diconnected.'));

	socket.on('createMessage', (message)=> {
		console.log(message);
		//socket.emit to single connection, io.emit to every connection
		io.emit('newMessage', {
			from:message.from,
			text:message.text,
			createAt: new Date().getTime()
		});
	});
});



//Middleware (express) Third-party add-on. 
app.use(express.static(publicPath));

server.listen(port, ()=>{console.log(`Server is up on port ${port}.`)});