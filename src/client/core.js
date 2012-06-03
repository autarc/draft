/*
	@Core:

	- delegate selection behavior (get/set)
	- create & store elements
	- initilaize as ready
*/

( function ( context, undefined ) {

	'use strict';


	/* Inital call - overwrite redirection */

	var	draft = function( selector, property ) {

		if ( typeof selector === 'function' ) {

			draft.ready( selector );

		} else {

			return draft.core.main( selector, property );
		}
	};


	/* Temporary storage for selection */

	draft.temp = null;



	/* Core = Object reference */

	draft.core = {

		/* Element management (should be in the core)  ! */

		list: {},


		/* Main - input delegation (select || default: list) */

		main: function ( selector, property ) {

			// show the elements in the list
			if ( !selector ) {

				return this.list;
			}

			// check if deep selection
			if ( typeof selector !== 'string' ) {

				draft.temp = selector;

				return draft;
			}

			if ( selector.indexOf(':') > -1 ) {

				selector = selector.split(':');
			}

			if ( property ) { // creating an element

				var el = this.create( this, property );

				this.set( selector, el );
			}

			return this.get( selector );
		},


		/* Creates a new element (inheriting from a parent) */

		create: function ( parent, child ) {

			parent = Object.create( parent );

			this.extend( parent, child );

			return parent;
		},


		/* Extends an object with the properties of another

			ToDo:

			- taking arguments and allowing multiple extensions of the prototype (currently just one extension)
			- easing:   Shape.prototype.move.apply(this, arguments); // parent() , super
		*/

		extend: function( target, source ) {

			if ( !source ){

				source = target;
				target = this;
			}

			Object.getOwnPropertyNames( source ).forEach( function ( propName ) {

				Object.defineProperty( target, propName, Object.getOwnPropertyDescriptor( source, propName ) );
			});

			return target;
		},


		/* Receives the key */

		get: function( key ) {

				// needs to be recheck
			if ( typeof key === 'string' ) {

				return this.list[ key ] || document.getElementById( key );

			}  else { // creating just an element

				var list = this.list;

				for ( var i = 0, l = key.length; i < l ; i++ ) {

					list = list[key[i]];
				}

				return list;
			}
		},


		/* Key - Value Connector (allows deep naming) */

		set: function( key, value ) {

			if ( typeof key === 'string' ) {

				this.list[key] = value; //this.create( this, obj );

			} else {

				var former = this.list;

				for ( var i = 0, l = key.length; i < l ; i++ ) {

					if ( i < l - 1  ) {

						if ( !former[key[i]] ) {

							former[key[i]] =  {};
						}

					} else {

						former[key[i]] = value;
					}

					former = former[key[i]];
				}

			}
		},


		/* Removes an element from the list */

		remove: function( id ) {

			if ( !id ) {

				// ?????? sinnvoll just the proprtie name getting !
				//id = this.uid;
			}

			delete this.list[id];
		}

	};


	/*	Initialize the document	*/

	draft.ready = ( function ready ( init ) {

		if ( 'DOMContentLoaded' in window ) {

			document.addEventListener('DOMContentLoaded', function(){

				document.removeEventListener('DOMContentLoaded');

				draft.setup ( init );
			});

		} else {

			if ( document.readyState === 'complete' ) {

				draft.setup ( init );

			} else {

				setTimeout( ready, 10, init );
			}
		}

		// shortens the default behavior of the draft
		context.draft = function ( selector, property ) {

			return draft.core.main( selector, property );
		};
	});

	/* Specify the environment & Modules */

	draft.setup = function ( code ) {

		// check if module exist + execute init
		var modules = draft('module'),

			callback = function() { start( code ); };

		for ( var module in modules ) {

			if ( modules[module].init ) {

				modules[module].init( callback );
			}
		}
	};


	/* Create the game Object and run the code ( callback in network) */

	function start( code ) {

		/* The Game object (!) */

		var game = draft('game', {

			/* One time Settings - defaults */

			init: function( cb ){

				cb();

				// partial call for gamestates !
			},


			/* Delegation of the stored input */

			input: function ( cb) {

				cb.call( draft('module:input') );
			},

			/* Update function, which gets the handler form the setup injected */

			update: function ( cb ) {

				cb();
			},

			/* Graphical Update of the canvas */

			render: function( cb ) {

				cb();

			},

			/* Conating the different game states*/

			states: function( cb ) {

				this.states = cb;
			}

			/* Loop-Sequence for repetition */

			// loop: function(){


			// (function animate() {

			// requestAnimationFrame( animate );
			// game.render();
			// console.log(window.requestAnim);
			// requestAnimFrame( animLoop );
			// game.update();
			// game.render();

			// }());
			// }
		});


		code( game );
	}



	/* Controlling the different game states */

	draft.states = {


	};


	/* Based on the obser Pattern / mediator ? */
	/* fluent - frp changes ?  */

	draft.events = {




	};


	/* simple setting CSS Styling (+ define for canvas) */

	draft.style = function ( values ) {

		var camelCase = draft('module:util').camelCase;

		for ( var property in values ) {

			if ( values.hasOwnProperty( property) ) {

				draft.temp.style[ camelCase( property ) ] = values[property];
			}
		}

		draft.temp = null;
	};


	/* Global Namespace */

	context.draft = context.draft || draft;

} ( window ) );






// 'use strict';

draft('module:events', {


	main: function(){

		//  .on()// e.stop() (for propaginations etc)

	}


});


// dealing with events, states and observer

// will also handle the states = controlling the current states


// Events = on - watch =// pub/sub
	// draft.events.on( )
	// draft.on = function(){


	// };

// watch: fixed events without subscribiton/freezed, no change from outsode






// Events - Observer Pattern





// // like bpbjs
// draft.observer = draft({

// 	listener: {},

// 	on: function ( type, cb ) {

// 		type.split(' ').forEach( function ( type )  {

// 			if ( !this.listeners[type] ) {

// 				this.listeners[type] = [];
// 			}

// 			this.listeners[type].push( cb );

// 		}.bind(this));

// 		return this;
// 	},

// 	off: function ( type, cb ) {

// 		if ( !cb ) {

// 			this.listeners[type].length = 0;
// 		}

// 		this.listeners[type].remove( cb ); // define ?
// 	},

// 	emit: function ( type ) {

// 		if ( !this.listeners[type] ) {

// 			return this;
// 		}

// 		var args = slide.call( argyments, 1);

// 		this.listeners[type].forEach( function ( fn ) {

// 			fn.apply( null, args || []);
// 		});

// 		return this;
// 	}

// });






//draft
//draft.el

//draft.ev

//draft().watch( draft('asd').a )

// watch - steady event listener, which watches on changes, other handlers are for physical stuf: etf. ( or could be said on change !)

//


//draft('').watch('asd.a', function(){
//});
//





// one object which manages the changes and looks through them

// draft.observerable = draft({

// 	subscribers: [],

// 	subscribe: function ( cb ) {

// 		this.subscribers.push( cb );
// 	},

// 	unsubscribe: function( cb ) {

// 		var i = 0,
// 			len = this.subscribers.length;

// 		for (; i<len; i++ ){

// 			if ( this.subscribers[i] === cb) {

// 				this.subscribers.splice( i , 1);

// 				return;
// 			}
// 		}
// 	},

// 	publish: function( data){


// 		var i = 0,
// 			len = this.subscribers.length;

// 		for (; i<len; i++ ){

// 			this.subscribers[i](data);
// 		}
// 	}

// });



// var Observer = function (data) {
//     console.log(1);
//     console.log( data );
// };



// draft.observerable.subscribe( Observer );
// draft.observerable.publish('Hio ^_^');






// Observable = function() {
//     this.status = "constructed";
// };
// Observable.prototype.getStatus = function() {
//     return this.status;
// };

// Observer = function() {
//     this.subscriptions = [];
// };
// Observer.prototype = {
//     subscribeTo: function(observable) {
//         this.subscriptions.push(observable);
//     },
//     unsubscribeFrom: function(observable) {
//         var i = 0,
//             len = this.subscriptions.length;

//         // Iterate through the array and if the observable is
//         // found, remove it.
//         for (; i < len; i++) {
//             if (this.subscriptions[i] === observable) {
//                 this.subscriptions.splice(i, 1);
//                 // Once we've found it and removed it, we
//                 // don't need to continue, so just return.
//                 return;
//             }
//         }
//     }


//     doSomethingIfOk: function() {
//         var i = 0;
//             len = this.subscriptions.length;

//         // Iterate through the subscriptions and determine
//         // whether the status has changed to ok on each of them,
//         // and do something for each subscription that has
//         for (; i < len; i++) {
//             if (this.subscriptions[i].getStatus() === "ok") {
//                 // Do something because the status of the
//                 // observable is what we want it to be
//             }
//         }
//     }
// }

// var observer = new Observer(),
//     observable = new Observable();
// observer.subscribeTo(observable);

// // Nothing will happen because the status hasn't changed
// observer.doSomethingIfOk();

// // Change the status to "ok" so now something will happen
// observable.status = "ok";
// observer.doSomethingIfOk();
