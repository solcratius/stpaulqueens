STPAULQUEENS.namespace( 'main.landing' );

STPAULQUEENS.main.landing = (function($) {
	var $WIN,
		$HTML,
		$BODY,
		$HEADER,
		$NAV_BTN,
		$CONTENT,
		$HERO,
		$SUBNAV,
		$SUBNAV_UL,
		$SUBNAV_BTN,
		$CONTENT_BODY,
		$CONTENT_SECT;
		
	var init = function() {
	    cacheDom();
	    
	    console.log("LANDING!!!!");
	};

	var cacheDom = function() {
		$WIN = $(window);
		$HTML = $('html');
		$BODY = $('body');
		$HEADER = $('#header');
		$NAV_BTN = $('#nav-toggle');
		$CONTENT = $('#content');
		$HERO = $CONTENT.find('.hero');
		$SUBNAV = $CONTENT.find('.sub-nav');
		$SUBNAV_UL = $SUBNAV.find('ul');
		$SUBNAV_BTN = $SUBNAV.find('.sub-nav-btn');
		$CONTENT_BODY = $CONTENT.find('.content-body');
		$CONTENT_SECT = $CONTENT_BODY.find('.section');
	};

	return {
		init: init
	};
})(jQuery);