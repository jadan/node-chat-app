//client side javascript
var socket = io(); 

socket.on('connect', function(){
	console.log('Connected to server.');
	// socket.emit('createMessage', {
	// 	to: "jane@doe.com",
	// 	text: "this is the text",
	// 	});
});

socket.on('disconnect', function(){
	console.log('Disconnected from server.');
});

socket.on('newMessage', function(message){
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	//render to the DOM 
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	//render to the DOM 
	jQuery('#messages').append(li);	
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	var messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function(){
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.'); 
	}
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(
		function(position){
			// console.log(position);
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, 
		function(){
			locationButton.removeAttr('disabled').text('Send location');
			return alert('Unable to fetch location.');
		}
	);
}); 