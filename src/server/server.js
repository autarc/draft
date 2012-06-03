// https://github.com/sockjs/sockjs-node
// https://github.com/sockjs/sockjs-node/tree/master/examples/test_server // (more advanced options)

var http	= require('http'),
	sockjs	= require('sockjs'),

	draft	= require('draft'),

	config	= require('./config');



// WebSocket - Server (SockJS API)
var socket_server = sockjs.createServer();

socket_server.on('connection', function ( socket  ) {

	console.log(socket);

	// Receiving data
	socket.on('data', function ( message ) {

		console.log(message);

		socket.write(message);
	});

	// Connection were closed
	socket.on('close', function(){

	});

});


// Echo Server
var s_echo = sockjs.createServer();

s_echo.on('connection', function( conn ){

	console.log(' [+] echo open:', conn );

	conn.on('close', function(){
		console.log(' [-] echo close:', conn);
	});

	conn.on('data', function ( message ) {

		var d = JSON.stringify( message );

		console.log(' [] echo message:', conn, d.slice(0,64) + ((d.length > 64)? '...' : ''));

		conn.write( message );

	});
});



// Close
var s_close = sockjs.createServer();

s_close.on('connection', function( conn ){

	console.log(' [+] close open:', conn);

	conn.close( 3000, 'Go away !');

	conn.on('close', function(){

		console.log(' [-] close closed:', conn);
	});

});




// Ticker
var s_ticker = sockjs.createServer();

s_ticker.on('connection', function ( conn ) {

	console.log(' [+] ticker open:', conn);

	var tref;

	var schedule = function(){
		conn.write('Tick !');
		tref = setTimeout( schedule, 1000);
	};

	tref = setTimeout( schedule, 1000);

	conn.on('close', function(){

		clearTimeout(trf);

		console.log(' [-] ticker closed:', conn);
	});

});



// Broadcast
var broadcast = {},

	s_broadcast = sockjs.createServer();

s_broadcast.on('connection', function ( conn ){

	console.log(' [+] broadcast open:', conn);

	broadcast[conn.id] = conn;

	conn.on('data', function ( message )  {

		console.log(' [-] broadcast message:', message );

		for ( var id in broadcast ){

			broadcast[id].write( message );
		}
	});

	conn.on('close', function(){

		delete broadcast[conn.id];

		console.log(' [-] broadcast close:', conn );
	});
});


// HTTP - nodeJS
var http_server = http.createServer();


// Attach handler to routes
s_echo.installHandlers( http_server,		{ prefix: '/echo'		});
s_close.installHandlers( http_server,		{ prefix: '/close'		});
s_ticker.installHandlers( http_server,		{ prefix: '/ticker'		});
s_broadcast.installHandlers( http_server,	{ prefix: '/broadcast'	});

// socket_server.installHandlers( http_server ); // overshadowing || http://localhost:2020/draft


http_server.listen( config.port, '127.0.0.1' ); // s+Server haben sich ihm angehanegen

console.log('[*] Server is listening on', config.host + ':' + config.port );





































// currently running a static server, but as node for communication - leverage the site would be ebst
//
// http_server.addEventListener('request', function ( req, res ) {

//	req.on('request', function ( req, res ) {

//		var data = JSON.stringify( 'Nothing here');

//		res.writeHead( 200, {
//								'Content-Type': 'text/html',
//                              'Content-Length': data.length,
//                              'Connection': 'keep-alive',
//                              'Access-Control-Allow-Origin': '*'
//							});
//		res.end( data );
//	});
// });
