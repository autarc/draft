/* Handling the client-server communication */

draft('module:network',{

	/* Creating webworker which just handles the coomunication */

	init: function( exec ){

		this.loadScript('src/_libs/sockjs/sockjs-client.js', exec );
	},


	/* loads + execute a script */

	loadScript: function( path, callback ) {

		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');

		if ( script.addEventListener ) { // normal browsers

			script.addEventListener('load', function(){

				callback();
			});

		} else {

			script.onreadystatechange = function() { // IE

				if ( script.readyState in { loaded: 1, complete: 1}) {

					js.onreadystatechange = null;

					callback();
				}
			};
		}

		script.src = path;

		document.getElementsByTagName('script')[0].parentNode.insertBefore( script );
	}

});
