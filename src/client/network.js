/* Handling the client-server communication */

draft('module:network',{

	/* Creating webworker which just handles the coomunication */

	init: function( exec ){

		this.loadScript('src/_libs/sockjs/sockjs-client.js', exec );
	},


	/* Loads + execute a script */

	loadScript: function( path, callback ) {

		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');

		if ( script.readyState ) {

			script.onreadystatechange = function(){
				callback();
			};

		} else {

			script.onload = function(){
				callback();
			};
		}

		script.src = path;
		document.getElementsByTagName('HEAD')[0].appendChild( script );
	}

});
