/* Input module */

draft('module:input', {

	/* Containing Keyboard Settings */

	Keyboard: {


		KeyMap : {

			'shift': 16,
			'ctrl' : 17, // control
			'alt': 18,
			'cmd': 91, //  '⌘'

			'backspace': 8,
			'tab': 9,
			'enter': 13, 'return' : 13,
			'space': 32,
			'esc': 27,
			'left': 37,
			'right': 39,
			'up': 38,
			'down': 40,
			'delete': 46,

			'POS1' : 36,  // HOME
			'end': 35,
			'paegeUp': 33,
			'pageDown': 34,

			// filling in afor loop - afterwrds
			'F1': 112, // ?
			'F2': 113,
			'F3': 114, // ?
			'F4': 115,
			'F5': 116,
			'F6': 117
		},

		// check if allready used
		watch: false,

		// list of entries to watch
		toWatch: {},


		// the current active keys
		activeKeys: {}, //also needs to store an association in conjunction with the keys, enabling them to execute the defined code


		/* Maps the key + values to the listner */

		keyboard: function( settings ) {
		// keys: function( settings ) {
			console.log(settings);


			for ( var k in settings ) {

				this.toWatch[k] = settings[k];

				if ( !this.watch ) { // just adding as needed

					this.watch = true;

					document.addEventListener('keydown', this.down.bind( this ) );

					document.addEventListener('keyup', this.up.bind( this ) );
				}
			}
		},


		down: function( e ) {

			this.change( e, true );
		},

		up: function( e ) {

			this.change( e, false );
		},

		change: function( e, dir ) {

			e.preventDefault();
			// e.cancelPropagattation();

			var key = e.keyCode || e.which,

				result = String.fromCharCode(key).toLowerCase(); // why fuchs. : key.toUpperCase().charCodeAt(0); ??

				// not using the string - but the keycode input to look up ? (better fo the space etc.)
				//
				//
					// var res = key.toString().charCodeAt(0);
				// not using the string - but the keycode input to look up ? (better fo the space etc.)
				// console.log(result);

			// pressing down
			if ( dir ) {

				if ( this.toWatch[result] ) {

					this.toWatch[result]();

					this.activeKeys[result] = true;
				}

				// console.log(this.activeKeys);

			} else {

				// console.log(result);
				if ( this.toWatch[result] ) {

					if ( draft('game').y ) {

						draft('game').y = 0;
					}

					if ( draft('game').x ){
						draft('game').x = 0;
					}

					delete this.activeKeys[result];
				}
			}

		}


	}, // Keyboard


	/* Touch */

	touch: {


	},


	/* Mouse */

	mouse: {

		pos: function ( e ) {

			var x = e.pageX || ( e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft ),
				y = e.pageY || ( e.clientY + document.body.scrollTop + document.documentElement.scrollTop );

			return [x,y];
		}
	},

	/* GamePad */

	controller: {

	}


});
