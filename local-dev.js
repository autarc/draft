/*
	local-dev.js
	------------

	This is a modified Version of the localhost-setup by crafty (https://github.com/craftyjs/Crafty/blob/master/crafty-local.js).

	It allows you to load the changed files directly, without concerning re-compiling/concatination. (now with IE8 support)
*/

(function ( window, undefined ) {

	var include = {

		base: 'src',

		client: [
					'core',
					'input',
					'loader',
					'polyfills',
					'canvas',
					'network'
				],

		shared: [
					'protocol',
					'util'
				]
	};

///////////////////////////////////////////////////////////////////////////////

	var output = '', // final results

		xhr = new XMLHttpRequest();

	if (!('withCredentials' in xhr )){

		xhr = window.XDomainRequest ?	new XDomainRequest() :
										null;
	}

	for ( var dir in include ) {

		if ( typeof include[dir] != 'string' ){

			var path = include.base + '/' + dir + '/';

			request(  path, include[dir] );
		}
	}

	function request( path, dir ) {

		var i = 0, // iterator

			l = dir.length,

			url;

		for( ; i < l ; i++ ) {

			url = path + dir[i] + '.js';

			xhr.open( 'GET', url, false );

			try {

				xhr.send(null);

			} catch ( e ) {

				alert("Your security settings prevent access to the local file-system. \n\r Access to restricted URI denied code 1012.\
						If you use chrome, try to run your browser with the flag: --allow-file-access-from-files .");
				break;
			}

			output +=  xhr.responseText;
		}
	}

	output += "\n//@ sourceURL=local-dev.js";

	eval(output);

})(window);
