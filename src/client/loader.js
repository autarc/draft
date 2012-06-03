/* Simple asset loader for images ^ audio */

draft('module:loader', {

	// Keeping track of results
	successCounter: 0,

	errorCounter: 0,

	queue: [],

	cache: {},


	/* Shortcut for load & accesing data */

	image: function ( path, startX, startY, endX, endY ) {

		if ( this.cache[ path ] ) {

			var cvs = document.createElement('canvas');

			// context - sdraw image
			return this.cache[ path ];

		} else {

			this.load( path );
		}
	},

	audio: function( path ){

		this.image.call( this, path );

	},


	/* loads files into the queue */

	load: function(){

		var args = arguments,

			l = args.length;

		// order doesnt matter
		while ( l-- ) {

			var path = args[l];

			if ( !this.cache[ path ] ) {

				this.cache[ path ] = true;

				this.queue.push( path );
			}
		}
	},


	/* Queue loader */

	ready: function ( callback ) {

		if( !this.queue.length ) {

			callback();

		} else {

			var l = this.queue.length;

			// order doesnt matter
			while ( l-- ) {

				var path = this.queue[l],

					container;

				if( path.substring( path.lastIndexOf('.') ) === '.png' ) {

					container = new Image();

				} else {

					container = new Audio();
				}

				container.onload = this.success( callback, true );

				container.onerror = this.success( callback, false );

				// container.onprogress = function() {}.bind(this)

				container.src = path;

				this.cache[ path ] = container;
			}
		}
	},


	success: function ( callback, loaded ) {

		if ( loaded ) {

			this.successCounter++;

		} else {

			this.errorCounter++;
		}

		if ( this.check() ) {

			callback();
		}
	},


	/* Simple check if last */

	check: function() {

		return ( this.successCounter + this.errorCounter === this.queue.length );
	}


});
