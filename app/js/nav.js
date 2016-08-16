STPAULQUEENS.namespace( 'main.nav' );

STPAULQUEENS.main.nav = (function($) {
	var OBJ_MAIN,
  		OBJ_SECT;

	var $BODY,
		$HEADER,
		$NAV_TOGGLE,
		$NAV_BTN,
		$STICKYNAV_TOP_BTN,
		$SUBNAV,
		$SUBNAV_TOP_BTN,
		$SUBNAV_BTN;
		
	var init = function() {
	    cache_dom();
	    OBJ_MAIN = STPAULQUEENS.main;
  		OBJ_SECT = STPAULQUEENS.main.landing;
	    
	    nav_handler.init();
	    anchorLinkInit();
	};

	var cache_dom = function() {
		$BODY = $('body');
		$HEADER = $('#header');
		$NAV_TOGGLE = $('#nav-toggle');
		$NAV_BTN = $HEADER.find('.navigation a');
		$STICKYNAV_TOP_BTN = $HEADER.find('.sub-nav .sprite-top-btn');
		$SUBNAV = $('#content .sub-nav');
		$SUBNAV_TOP_BTN = $SUBNAV.find('.sprite-top-btn');
		$SUBNAV_BTN = $SUBNAV.find('.sub-nav-btn');
	};

	var nav_handler = {
		init: function() {
			$NAV_TOGGLE.on('click', this.nav_toggle_on.bind(this));
			$NAV_BTN.on('click', this.nav_btn_on.bind(this));
			$STICKYNAV_TOP_BTN.on('click', this.subnav_topbtn_on.bind(this));
			$SUBNAV_TOP_BTN.on('click', this.subnav_topbtn_on.bind(this));
			$SUBNAV_BTN.on('mouseover', this.subnav_btn_hover.bind(this));
			$SUBNAV_BTN.on('mouseout', this.subnav_btn_hout.bind(this));
		},
		nav_toggle_on: function(e) {
			e.preventDefault();
		    e.stopPropagation();

			if ($BODY.hasClass('nav-open'))
			{
				$BODY.removeClass('nav-open');
				$HEADER.delay(250).animate({
					scrollTop: 0
				}, 0);
			}
			else
			{
				$BODY.addClass('nav-open');
			}
		},
		nav_btn_on: function(e) {
		    e.stopPropagation();

		    $BODY.removeClass('nav-open');
			$HEADER.delay(250).animate({
				scrollTop: 0
			}, 0);
		},
		subnav_topbtn_on: function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		    
			OBJ_MAIN.anchorAnim(0, " ");
		},
		subnav_btn_hover: function(e) {
		    e.preventDefault();
		    e.stopPropagation();

		    if (OBJ_MAIN.getSectID() <= 0)
		    {
		    	$SUBNAV_BTN.removeClass('on');
		    	$(this).addClass('on');
		    }
		},
		subnav_btn_hout: function(e) {
		    e.preventDefault();
		    e.stopPropagation();

		    if (OBJ_MAIN.getSectID() <= 0) $SUBNAV_BTN.addClass('on');
		}
	};

	var anchorLinkInit = function() {
		$('a[href*="#"]:not([href="#"])').on("click", function(e) {
			// e.preventDefault();
			e.stopPropagation();
		    
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		    	var target = $(this.hash);
		    	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		    	
		    	if (target.length) {
			        OBJ_MAIN.anchorAnim(target.index()+1, $(this).attr('href').split('#')[1]);
		    	}
		    }
		});
	};

	return {
		init: init
	};
})(jQuery);