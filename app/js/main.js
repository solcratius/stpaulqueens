console.log("Main code");

var $WIN = $(window),
	$html = $('html'),
	$body = $('body'),
	$header = $('#header'),
	$navBtn = $('#nav-toggle'),
	$content = $('#content'),
	$hero = $('#content .hero'),
	$subNav = $('#content .sub-nav');

$html.addClass('noResize');
$html.addClass('noTouch');

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
		// console.log(st+", "+(heroH - 60 - 70));
    }
    else
    {
    	if ((st <= (heroH - 40 - 70) && $subNav.find('ul').is(':visible')) ||
    		(st <= (heroH - 6 - 50) && !$subNav.find('ul').is(':visible')))
    	{
    		$content.removeClass('sticky-nav');
    	}
    }
    lastScrollTop = st;
});







$navBtn.on('click', function(e) {
	e.preventDefault();
    e.stopPropagation();

	if ($header.hasClass('nav-open'))
	{
		$html.removeClass('nav-open');
		$header.removeClass('nav-open');
		$header.delay(250).animate({
			scrollTop: 0
		}, 500);

		// $header.removeAttr('style');
	}
	else
	{
		$html.addClass('nav-open');
		$header.addClass('nav-open');
		// setTimeout(function(i) {
		// 	$header.css('overflow', 'auto');
		// }, 750);
	}
	console.log("Toggle clicked");
});






$('a.sprite-top-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('html,body').animate({
        scrollTop: 0
    }, 500, 'easeInOutCubic');
    return false;
});

