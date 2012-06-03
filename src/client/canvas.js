draft('module:canvas', {

	list: {},

	/* Initial creation of Canvas * DOM */

	init: function() {

		/* Default elements */

		var container = document.createElement('div'),

			canvas = document.createElement('canvas');

		/* Define for access */

		this.list.main = canvas;


		/* Attributes and Content */

		container.id = 'container',

		canvas.innerHTML = 'Sorry - but your current browser doesn\'t seem to suppport Canvas.';


		/* Layout & Styles */

		// draft(document.body).style({ backgroundColor: '#000' });


		/* Attach to DOM */

		container.appendChild( canvas );

		document.body.appendChild( container );
	},

	// optional background color for the canvas as 3rd parameter?

	main: function( width, height ) {
		// why still accres to the container here ? no renference in the object ....
		// console.log(container);
		draft(container).style({

			width: width,
			margin: '0 auto',
			position: 'absolute',
			//top: '20%' ,
			left: '33%'
		});

		this.list.main.width = width;
		this.list.main.height = height;
	},


	/* Common simple shapes */

	shapes: {


		rect: function ( xStart, yStart, width, height ) {


		},

		elipse: function( width, height ) {


		},

		circle: function ( radius ) {

			return this.elipse( radius, radius );
		},

		pyramid: function ( ) {

		}

	},


	/* Handling layers */

	layer: function( name ) {

		layer.manage = {

			list: {},

			get: function ( name ) {


			}
		};


		return layer.manage.get( name );
	},


	/* Ease letter/text usage */

	text: function(){


	},


	/* Pick an element */
	select: function ( ){

		this.position = undefined;
	},


	/*	Determine 'reverse-selection' (non overlapping containers)

		=> https://github.com/bgrins/inverse-intersection
	*/

	reverse: function() {

	}

});
