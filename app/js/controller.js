
'use strict';

var STPAULQUEENS = STPAULQUEENS || {};

(function() {

	STPAULQUEENS.namespace = function(nsString) {
	    var parts 	= nsString.split( '.' ),
	        parent 	= STPAULQUEENS,
	        i;

	    if ( parts[0] === 'STPAULQUEENS' ) {
	    	parts = parts.slice(1);
	    }

	    for ( i = 0; i < parts.length; i += 1 ) {
	    	if ( typeof parent[ parts[i] ] === 'undefined' ) {
	        	parent[ parts[i] ] = {};
	      	}
	      	parent = parent[ parts[i] ];
	    }

	    return parent;
	};
})();

//-----------------------------------------------------------------------------------------------

STPAULQUEENS.namespace( 'controller' );

STPAULQUEENS.controller = (function() {

  	var init = function() {
    	var doc = document.documentElement;
    	doc.setAttribute('data-useragent', navigator.userAgent);

    	window.onload = function() {
    		STPAULQUEENS.main.init();
	    	// STPAULQUEENS.main.nav.init();
	    	// STPAULQUEENS.main.landing.init();
	    }
	};

	return {
		init: init
	};

})();

//-----------------------------------------------------------------------------------------------

$(document).ready(function() {
	STPAULQUEENS.controller.init();
});