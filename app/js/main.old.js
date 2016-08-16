
// STPAULQUEENS.main = (function($) {
// 	var OBJ_NAV,
//   		OBJ_SECT;

// 	var $WIN,
// 		$ROOT,
// 		$HTML,
// 		$BODY,
// 		$CONTENT,
// 		$HERO,
// 		$SUBNAV,
// 		$SUBNAV_UL,
// 		$SUBNAV_BTN,
// 		$CONTENT_BODY,
// 		$CONTENT_SECT;

// 	var pageSectID = 0,
// 		pageSectTop = [],
// 		heroH,
// 		subHash;
		
// 	var init = function() {
// 	    cacheDom();
// 	    OBJ_NAV = STPAULQUEENS.main.nav;
//   		OBJ_SECT = STPAULQUEENS.main.landing;
	    
// 	    $HTML.addClass('noResize');
// 		$HTML.addClass('noTouch');
// 		subHash = window.location.hash.slice(1);
// 		checkUserAgent.init();

// 		winResize();

// 		if (subHash) winScroll(true);
// 		else winScroll(false);

// 		resetPageSectTop();
// 		setPageSectID();

// 		pageAnchorAnim(0, " ");

// 		OBJ_NAV.init();

// 		if (subHash)
// 		{
// 			var target = $('[name=' + subHash +']');
// 			pageAnchorAnim(target.index() + 1, "#"+subHash);
// 		}
// 	};

// 	var cacheDom = function() {
// 		$WIN = $(window);
// 		$ROOT = $('html, body');
// 		$HTML = $('html');
// 		$BODY = $('body');
// 		$CONTENT = $('#content');
// 		$HERO = $CONTENT.find('.hero');
// 		$SUBNAV = $CONTENT.find('.sub-nav');
// 		$SUBNAV_UL = $SUBNAV.find('ul');
// 		$SUBNAV_BTN = $SUBNAV.find('.sub-nav-btn');

// 		$CONTENT_BODY = $CONTENT.find('.content-body');
// 		$CONTENT_SECT = $CONTENT_BODY.find('.section');
// 	};

// 	// check for touch device and iOS detection
// 	var checkUserAgent = {
// 		iOS: false,
// 		isTouch: false,
// 		init: function() {
// 			checkUserAgent.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// 			if (checkUserAgent.is_touch_device()) {
// 				checkUserAgent.isTouch = true;
// 				$HTML.removeClass('noTouch');
// 				document.addEventListener("touchstart", function(){}, true); 
// 			}

// 			if (checkUserAgent.iOS) $HTML.addClass('iOS-detect');
// 		},
// 		is_touch_device: function () {
//   			return 'ontouchstart' in window    // works on most browsers 
// 			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
// 		}
// 	};

// 	// window resize stops css animation and resets on callback
// 	var winResize = function() {
// 		var wrTime,
// 			wrTimeout = false,
// 			wrDelta = 200;

// 		$WIN.resize(function() {
// 		   	wrTime = new Date();
// 		    if (wrTimeout === false) {
// 		        wrTimeout = true;
// 		        $HTML.removeClass('noResize');
// 		        setTimeout(resizeEnd, wrDelta);
// 		    }
// 		});

// 		var resizeEnd = function() {
// 		    if (new Date() - wrTime < wrDelta) {
// 		        setTimeout(resizeEnd, wrDelta);
// 		    } else {
// 		        wrTimeout = false;
// 		        $HTML.addClass('noResize');
		        
// 		        if (!checkUserAgent.isTouch)
// 		        {
// 		        	resetPageSectTop();
// 		        	pageAnchorAnim();
// 		        }
// 		    }
// 		}
// 	};

// 	// window scroll callback for sticky nav with iOS support
// 	var winScroll = function(hashVal) {
// 		var lastScrollTop = 0;

// 		$WIN.on('scroll', function(e) {
// 			var $THIS = $(this),
// 				st = $THIS.scrollTop();

// 			if (checkUserAgent.iOS)
// 			{
// 				if (hashVal)
// 				{
// 					$CONTENT.addClass('sticky-nav');
// 					if (!$SUBNAV_UL.is(':visible')) $SUBNAV.css('top', '50px');
// 					else $SUBNAV.css('top', '70px');
// 					setPageSectID(st, 'down');

// 					clearTimeout($.data(this, 'scrollTimer'));
// 				    $.data(this, 'scrollTimer', setTimeout(function() {
// 				    	hashVal = false;
// 				    }, 250));
// 				}
// 				else
// 				{
// 					if (st > lastScrollTop)
// 					{
// 						$SUBNAV.removeAttr('style');

// 						if ((st > (heroH - 70) && $SUBNAV_UL.is(':visible')) || (st > (heroH - 50) && !$SUBNAV_UL.is(':visible')))
// 				    	{
// 							$CONTENT.addClass('sticky-nav');
// 				    	}

// 						setPageSectID(st, 'down');
// 				    }
// 				    else
// 				    {
// 				    	if (pageSectID < 1) $SUBNAV.removeAttr('style');

// 				    	if ((st > (heroH - 70) && $SUBNAV_UL.is(':visible')) || (st > (heroH - 50) && !$SUBNAV_UL.is(':visible')))
// 				    	{
// 							$CONTENT.addClass('sticky-nav');
// 				    	}

// 				    	if ((st <= (heroH - 40- 70) && $SUBNAV_UL.is(':visible') && $CONTENT.hasClass('sticky-nav')) || (st <= (heroH - 6 - 50) && !$SUBNAV_UL.is(':visible') && $CONTENT.hasClass('sticky-nav')))
// 				    	{
// 				    		$CONTENT.removeClass('sticky-nav');
// 				    	}

// 				    	setPageSectID(st, 'up');
// 				    }
// 				}
// 			}
// 			else
// 			{
// 				if (st > lastScrollTop)
// 				{				
// 					if ((st > (heroH - 50 - 70) && $SUBNAV_UL.is(':visible') && !$CONTENT.hasClass('sticky-nav')) || (st > (heroH - 6 - 50) && !$SUBNAV_UL.is(':visible') && !$CONTENT.hasClass('sticky-nav')))
// 			    	{
// 						$CONTENT.addClass('sticky-nav');
// 			    	}

// 					setPageSectID(st, 'down');
// 			    }
// 			    else
// 			    {
// 			    	if ((st <= (heroH - 40 - 70) && $SUBNAV_UL.is(':visible') && $CONTENT.hasClass('sticky-nav')) || (st <= (heroH - 6 - 50) && !$SUBNAV_UL.is(':visible') && $CONTENT.hasClass('sticky-nav')))
// 			    	{
// 			    		$CONTENT.removeClass('sticky-nav');
// 			    	}

// 			    	setPageSectID(st, 'up');
// 			    }
// 			}
			

// 		    lastScrollTop = st;
// 		});
// 	};

// 	// reset pageSectTop array, set y value of page sections
// 	var resetPageSectTop = function() {
// 		heroH = $HERO.height();
// 		pageSectTop = [0];

// 		$CONTENT_SECT.each(function(i) {
// 			var stickyNavDiff, y;
				
// 				stickyNavDiff = ($SUBNAV_UL.is(':visible')) ? 108 : 54;
// 				if (checkUserAgent.iOS && $SUBNAV_UL.is(':visible') && i <= 0) stickyNavDiff = 88;
// 				y = $(this).position().top - stickyNavDiff;

// 			pageSectTop.push(Math.floor(y));
// 		});
// 	};

// 	// set current page section id by window scroll position
// 	var setPageSectID = function(y, dir) {
// 		if (dir == "down")
// 		{
// 			if (y >= pageSectTop[pageSectID + 1] && pageSectID < (pageSectTop.length-1)) pageSectID += 1;
// 		}
// 		else
// 		{
// 			if (y < pageSectTop[pageSectID] && pageSectID > 0) pageSectID -= 1;
// 		}

// 		$SUBNAV_BTN.removeClass('on');
// 		if (pageSectID <= 0) $SUBNAV_BTN.addClass('on');
// 		else $SUBNAV_BTN.eq(pageSectID-1).addClass('on');

// 		// console.log("dir:"+dir+", pageSectID:"+pageSectID+", pageSectTop:"+pageSectTop[pageSectID]+", windowY:"+y);
// 	};

// 	// page anchor vertical slide animation call
// 	var pageAnchorAnim = function(id, hash) {
// 		var duration, velocity;
		
// 		if (id == undefined)
// 		{
// 			id = pageSectID;
// 			duration = 100;
// 		}
// 		else
// 		{
// 			velocity = Math.abs(pageSectID-id);
// 			duration = (velocity > 2) ? 250 * velocity : 400 * velocity;
// 			pageSectID = id;
// 		}

// 		$ROOT.animate({
// 	        scrollTop: pageSectTop[id]
// 	    }, duration, 'easeInOutCubic', function() {
// 	    	if (hash) window.location.hash = hash;
// 	    });
// 	};

// 	return {
// 		init: init,
// 		getPageSectTop: function(n) { return pageSectTop[n]; },
// 		getPageSectID: function() { return pageSectID; },
// 		pageAnchorAnim: pageAnchorAnim
// 	};
// })(jQuery);
