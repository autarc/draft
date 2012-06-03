/* Basic Module for Utility tasks */

draft('module:util', {


	/* camelCase conversion inplace (e.g. for css) */

	camelCase: function( str ) {

		return str.replace(/[A-Z]/g, function ( selection ) {

			return '-' + selection.toLowerCase();
		});
	},

	/* Creating a random integer in the range of a-b */

	random: function ( a, b, c ) {

		c=a;

		a=(!b)?0:((a<=b)?a:b);

		(!b)?((a>c)?(b=a):(b=c)):((b>c)?(b=b):(b=c));

		a=(a^b)?a:c;

		return ( a+(0|Math.random()*(b-a+1) ) );
	}

});
