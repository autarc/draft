/* Here should be the display & interaction logic of the game */

draft( function(){


	var input = document.createElement('input');

	document.getElementById('container').appendChild(input);


	var path = '/echo', // echo, close, ticker, broadcast

		url = 'http://localhost:2020' + path,

		socket = new SockJS( url, '', { debug: true, devel: true });


	socket.onopen = function() {

		console.log( '[*] Open (', socket.protocol, ')' );
	};

	socket.onmessage = function(e) {

		console.log( 'Message:', e.data );
	};


	socket.onclose = function() {

		console.log('[*] Close');
	};

	socket.onerror = function ( e ){

		console.log('[*] Error:', e );
	};


	input.addEventListener('keyup', function( e ){

		var key = e.keyCode || e.which || e.key;

		key = String.fromCharCode(key).toLowerCase();
		// key = key.toString().charCodeAt(0);

		socket.send(key);
	});


});
