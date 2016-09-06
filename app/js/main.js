STPAULQUEENS.namespace( 'main' );

STPAULQUEENS.main = (function($) {
	var OBJ_NAV,
  		OBJ_SECT;

	var $WIN,
		$ROOT,
		$HTML,
		$BODY_P_NAME,
		$HEADER,
		$NAV_SECT,
		$STICKYNAV_BTN,
		$CONTENT,
		$HERO,
		$SUBNAV,
		$SUBNAV_UL,
		$SUBNAV_BTN,
		$CONTENT_SECT;
		
	var init = function() {
	    cache_dom();
	    OBJ_NAV = STPAULQUEENS.main.nav;
  		OBJ_SECT = STPAULQUEENS.main.landing;
	    
	    $HTML.addClass('noResize');
		$HTML.addClass('noTouch');
		var subHash = window.location.hash.slice(1);

		OBJ_SECT.init();

		user_agent.init();
		w_resize.init();
		w_scroll.init();

		p_main.init();
		p_sect.init();
		p_sect.setPosId();

		if (subHash)
		{
			w_scroll.hash = true;
			var target = $('[name=' + subHash +']');
			p_sect.anchorAnim(target.index() + 1, "#"+subHash);
		}
		else
		{
			p_sect.anchorAnim(0, " ");
		}

		OBJ_NAV.init();
	};

	//cache_dom: cache DOM elements for optimization
	var cache_dom = function() {
		$WIN = $(window);
		$ROOT = $('html, body');
		$HTML = $('html');
		$BODY_P_NAME = $('body[class^="stpaul-"]');
		$HEADER = $('#header');
		$NAV_SECT = $HEADER.find('ul.navigation li.section');
		$STICKYNAV_BTN = $HEADER.find('.sub-nav .sub-nav-btn');
		$CONTENT = $('#content');
		$HERO = $CONTENT.find('.hero');
		$SUBNAV = $CONTENT.find('.sub-nav');
		$SUBNAV_UL = $SUBNAV.find('ul');
		$SUBNAV_BTN = $SUBNAV.find('.sub-nav-btn');
		$CONTENT_SECT = $CONTENT.find('.content-body .section');
	};

	//user_agent: check for touch device and iOS detection
	var user_agent = {
		isTouch: false,
		init: function() {
			if (this.is_touch_device()) {
				this.isTouch = true;
				$HTML.removeClass('noTouch');
				document.addEventListener("touchstart", function(){}, true); 
			}
		},
		is_touch_device: function () {
  			return 'ontouchstart' in window    // works on most browsers 
			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
		}
	};

	//w_resize: window resize stops css animation and resets on callback, reposition to top anchor upon resize
	var w_resize = {
		width: 0,
		height: 0,
		m_view: false,
		time: null,
		timeout: false,
		delta: 200,
		init: function() {
			w_resize.width = $WIN.width();
			w_resize.height = $WIN.height();

			if (!$SUBNAV_UL.is(':visible')) w_resize.m_view = true;
	    	else w_resize.m_view = false;
			
			if (!user_agent.isTouch) $WIN.on('resize', this.start.bind(this));
			else $WIN.on('orientationchange', this.start.bind(this));
		},
		start: function() {
			this.time = new Date();
		    if (w_resize.timeout === false) {
		        w_resize.timeout = true;
		        $HTML.removeClass('noResize');
		        setTimeout(this.end, this.delta);
		    }
		},
		end: function() {
		    if (new Date() - this.time < this.delta) {
		        setTimeout(this.end, this.delta);
		    } else {
		        w_resize.timeout = false;
		        $HTML.addClass('noResize');
		        
		        if (!$SUBNAV_UL.is(':visible')) w_resize.m_view = true;
		    	else w_resize.m_view = false;

		    	w_resize.width = $WIN.width();
				w_resize.height = $WIN.height();

				p_main.p_feature();
		        p_sect.init();
		        if (p_main.id < 100) p_sect.anchorAnim();
		    }
		}
	};

	//w_scroll: window scroll callback for sticky nav with iOS support
	var w_scroll = {
		lastScrollTop: 0,
		st: 0,
		hash: false,
		init: function() {
			$WIN.on('scroll', this.start.bind(this));
		},
		start: function() {
			this.st = $WIN.scrollTop();

		 	if (this.st > 5) $CONTENT.addClass('skinny-nav');
		 	else $CONTENT.removeClass('skinny-nav');

		 // 	if (this.st > this.lastScrollTop)
			// {				
			// 	if ((this.st > (p_sect.heroH - 109) && !w_resize.m_view && !$HEADER.hasClass('sticky-nav') && p_main.id < 100) 
			// 		|| (this.st > (p_sect.heroH - 77) && !w_resize.m_view && !$HEADER.hasClass('sticky-nav') && p_main.id >= 100)
			// 		|| (this.st > (p_sect.heroH - 57) && w_resize.m_view && !$HEADER.hasClass('sticky-nav'))) $HEADER.addClass('sticky-nav');
			// 	p_sect.setPosId(this.st, 'down');
		 //    }
		 	
		 	if (this.st > this.lastScrollTop)
			{				
				if ((this.st > (p_sect.heroH - 112) && !w_resize.m_view && !$HEADER.hasClass('sticky-nav') && p_main.id < 100) 
					|| (this.st > (p_sect.heroH - 80) && !w_resize.m_view && !$HEADER.hasClass('sticky-nav') && p_main.id >= 100)
					|| (this.st > (p_sect.heroH - 60) && w_resize.m_view && !$HEADER.hasClass('sticky-nav'))) $HEADER.addClass('sticky-nav');
				p_sect.setPosId(this.st, 'down');
		    }
		    else
		    {
		    	if ((this.st <= (p_sect.heroH - 109) && !w_resize.m_view && $HEADER.hasClass('sticky-nav') && p_main.id < 100) 
		    		|| (this.st <= (p_sect.heroH - 77) && !w_resize.m_view && $HEADER.hasClass('sticky-nav') && p_main.id >= 100)
		    		|| (this.st <= (p_sect.heroH - 57) && w_resize.m_view && $HEADER.hasClass('sticky-nav'))) $HEADER.removeClass('sticky-nav');
		    	p_sect.setPosId(this.st, 'up');
		    }
			
		    this.lastScrollTop = this.st;
		}
	};

	//p_main: main page indexing and custom triggers
	var p_main = {
		id: 100,
		init: function() {
			var curPageClass = $BODY_P_NAME.attr('class');
			p_main.id = 100;

			$NAV_SECT.each(function(i) {
				var navClass = $(this).find('*[class^="stpaul-"]').attr('class');
				if (navClass == curPageClass) p_main.id = i;
			});

			OBJ_SECT.handler(p_main.id);
			this.p_feature();
		},
		p_feature: function() {
			if (p_main.id >= 100 && !w_resize.m_view)
			{
				if (!w_resize.m_view) $HERO.css('height', w_resize.height+'px');
			}
			else
			{
				$HERO.removeAttr('style');
			}
		}
	}

	//p_sect: sections top y position, section id, animate to section top anchors
	var p_sect = {
		id: 0,
		posTop: [0],
		heroH: 0,
		duration: 100,
		velocity: 1,
		init: function() {
			this.heroH = $HERO.height();
			this.setPosTop();
		},
		setPosTop: function() {
			p_sect.posTop = [0];

			$CONTENT_SECT.each(function(i) {
				var stickyNavDiff, yPos;
				stickyNavDiff = (!w_resize.m_view) ? 108 : 54;
				if (p_main.id >= 100) stickyNavDiff = 54;

				yPos = $(this).position().top - stickyNavDiff;
				p_sect.posTop.push(Math.floor(yPos));
			});
			
			// console.log(p_sect.posTop);
		},
		setPosId: function(y, dir) {
			if (dir == "down")
			{
				if (y >= this.posTop[this.id + 1] && this.id < (this.posTop.length-1)) this.id += 1;
			}
			else
			{
				if (y < this.posTop[this.id] && this.id > 0) this.id -= 1;
			}

			$STICKYNAV_BTN.removeClass('on');
			$SUBNAV_BTN.removeClass('on');

			if (this.id <= 0) $SUBNAV_BTN.addClass('on');
			else $STICKYNAV_BTN.eq(this.id-1).addClass('on');
		},
		anchorAnim: function(i, hash) {
			if (i == undefined)
			{
				i = this.id;
				this.duration = 100;
			}
			else
			{
				this.velocity = Math.abs(this.id - i);
				if (this.velocity <= 0) this.velocity = 1;
				this.duration = (this.velocity > 2) ? 250 * this.velocity : 400 * this.velocity;
				this.id = i;
			}

			$ROOT.animate({
		        scrollTop: this.posTop[i]
		    }, this.duration, 'easeInOutCubic', function() {
		    	if (hash) window.location.hash = hash;
		    });
		}	
	};

	var url_obj = {
		// vars: [],
		// hash: [],
		// hashs: [],

		getUrlParam: function(u) {
			var vars = [],
				hash = [],
				hashes = [];

			hashes = u.slice(u.indexOf('?') + 1).split('&');

			for(var i = 0; i < hashes.length; i ++)
		    {
		        hash = hashes[i].split('=');
		        vars.push(hash[0]);
		        vars[hash[0]] = hash[1];
		    }

		    return vars;
		}
	// 	
		// getUrlParam: function(name, url) {
		//     if (!url) url = window.location.href;
		//     name = name.replace(/[\[\]]/g, "\\$&");
		//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		//         results = regex.exec(url);
		//         console.log('name:'+name+', '+results);
		//     if (!results) return null;
		//     if (!results[2]) return '';
		//     return decodeURIComponent(results[2].replace(/\+/g, " "));
		// }
	};

	return {
		init: init,
		getSectID: function() { return p_sect.id; },
		getM_view: function() { return w_resize.m_view; },
		pSectUpdate: function() { p_sect.init() },
		anchorAnim: function(i, h) { p_sect.anchorAnim(i, h); },
		getUrl_Param: function(u) { return url_obj.getUrlParam(u); }
	};
})(jQuery);
