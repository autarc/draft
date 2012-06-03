/* Collection of Polyfills - to ease the usage of APIs */

draft('module:polyfills', {

    init: function() {

        // Polyfills - Shims

            // fallback for older browser
            if ( typeof Object.create !== "function" ) {

                Object.create = function( o ) {
                    var F = function() {};
                    F.prototype = o;
                    return new F();
                };
            }

        /* RequestAnimationFrame Polyfill: https://gist.github.com/1579671

            API:

            instead of: setInterval( render, time );

            (function animloop(){
              requestAnimFrame(animloop);
              render();
            })();
        */

        (function() {

            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());

    }

});
