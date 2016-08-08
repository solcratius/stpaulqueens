console.log("Main code");

var $WIN = $(window),
	$html = $('html'),
	$body = $('body'),
	$header = $('#header'),
	$navBtn = $('#nav-toggle'),
	$content = $('#content'),
	$hero = $('#content .hero'),
	$subNav = $('#content .sub-nav'),
	$subNavBtn = $('#content .sub-nav .sub-nav-btn'),
	$contentBody = $('#content .content-body'),
	$contentSect = $('#content .content-body > div');

$html.addClass('noResize');
$html.addClass('noTouch');


//window resize stops css animation and resets on callback
var wrTime;
var wrTimeout = false;
var wrDelta = 200;
$WIN.resize(function() {
    wrTime = new Date();
    if (wrTimeout === false) {
        wrTimeout = true;
        $html.removeClass('noResize');
        setTimeout(resizeEnd, wrDelta);
    }
});

function resizeEnd() {
    if (new Date() - wrTime < wrDelta) {
        setTimeout(resizeEnd, wrDelta);
    } else {
        wrTimeout = false;
        $html.addClass('noResize');
        setPageSectPos();
    }               
}




var is_touch_device = function () {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

if (is_touch_device()) {
	$html.removeClass('noTouch');
	document.addEventListener("touchstart", function(){}, true); 
}

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) $html.addClass('iOS-detect');




//window scroll callback for sticky nav on iOS
var lastScrollTop = 0;
$WIN.on('scroll', function(e) {
	var $THIS = $(this),
		st = $THIS.scrollTop(),
		heroH = $hero.height();

	if (st > lastScrollTop)
	{
		if (iOS)
		{
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
		        if ((st > (heroH - 70) && $subNav.find('ul').is(':visible')) ||
	    		(st > (heroH - 50) && !$subNav.find('ul').is(':visible')))
		    	{
		    		$content.addClass('sticky-nav');
		    	}
		    }, 250));
		}
		else
		{
			if ((st > (heroH - 50 - 70) && $subNav.find('ul').is(':visible')) ||
    		(st > (heroH - 6 - 50) && !$subNav.find('ul').is(':visible')))
	    	{
	    		$content.addClass('sticky-nav');
	    	}
		}

		checkPageSectID(st, 'down');
    }
    else
    {
    	if ((st <= (heroH - 40 - 70) && $subNav.find('ul').is(':visible')) ||
    		(st <= (heroH - 6 - 50) && !$subNav.find('ul').is(':visible')))
    	{
    		$content.removeClass('sticky-nav');
    	}

    	checkPageSectID(st, 'up');
    }
    lastScrollTop = st;

    // console.log(st);
});





//hamburger button function
$navBtn.on('click', function(e) {
	e.preventDefault();
    e.stopPropagation();

	if ($body.hasClass('nav-open'))
	{
		$body.removeClass('nav-open');
		$header.delay(250).animate({
			scrollTop: 0
		}, 0);
	}
	else
	{
		$body.addClass('nav-open');
	}
	console.log("Toggle clicked");
});





//back to top button function
$('a.sprite-top-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('html,body').animate({
        scrollTop: 0
    }, 500, 'easeInOutCubic');
    return false;
});




var pageSectID = 0,
	pageSectTop = [],
	contentBodyY = $contentBody.position().top;

function setPageSectPos() {
	pageSectTop = [];
	$contentSect.each(function(i) {
		var y = $(this).position().top;
		pageSectTop.push(contentBodyY + y - 85);
	});
};

//subnav functions
function checkPageSectID(y, dir) {
	for (var i = 0; i < pageSectTop.length; i ++)
	{
		if (dir == "down")
		{
			if (y >= pageSectTop[pageSectID]) pageSectID ++;
			else pageSectID = 0;
			console.log("Going down");
		}
		else
		{
			if (y <= pageSectTop[pageSectID]) pageSectID = --;
			else pageSectID = 0;
			console.log("Going up");
		}
	};

	console.log(pageSectID+", curY:"+y+", pageSectY:"+pageSectTop[pageSectID]);
};

$subNavBtn.each(function(i) {
	var id = i,
		$THIS = $(this);

	$THIS.on('click', function(e) {
	    e.preventDefault();
	    e.stopPropagation();

	    $('html,body').animate({
	        scrollTop: pageSectTop[id]
	    }, 500, 'easeInOutCubic');
	});
});

setPageSectPos();

