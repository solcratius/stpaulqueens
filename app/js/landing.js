STPAULQUEENS.namespace( 'main.landing' );

STPAULQUEENS.main.landing = (function($) {
	var OBJ_MAIN,
  		OBJ_NAV,
  		OBJ_RDATA;

	var $WIN,
		$ROOT,
		$BODY,
		$CONTENT,
		$HERO,
		$CONTENT_BODY,
		$CONTENT_SECT,
		$SECT_MEDIA;
		
	var init = function() {
	    cacheDom();
	    OBJ_MAIN = STPAULQUEENS.main;
  		OBJ_NAV = STPAULQUEENS.main.nav;
  		OBJ_RDATA = STPAULQUEENS.main.landing.rdata;
	    
	    console.log("LANDING!!!!");
	};

	var handler = function(id) {
	    if (id == 1) spiritualLife_handler.init();
	    if (id == 2) oneCommunity_handler.init();
	    if (id == 3) ourParish_handler.init();
	    if (id == 4) educationCenter_handler.init();
	    if (id == 5) mediaLibrary_handler.init();
	    if (id >= 100) homePage_handler.init();
	};

	var cacheDom = function() {
		$WIN = $(window);
		$ROOT = $('html, body');
		$BODY = $('body');
		$CONTENT = $('#content');
		$HERO = $CONTENT.find('.hero');
		$CONTENT_BODY = $CONTENT.find('.content-body');
		$CONTENT_SECT = $CONTENT_BODY.find('.section');
		$SECT_MEDIA = $CONTENT_BODY.find('.section.media');
	};

	var homePage_handler = {
		$HOME_START_BTN: null,

		init: function() {
			this.$HOME_START_BTN = $HERO.find('a.home-start-btn');
			this.$HOME_START_BTN.on('click', this.home_start_on.bind(this));
		},

		home_start_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    OBJ_MAIN.anchorAnim(1);
		}
	};

	var spiritualLife_handler = {
		$P_CONTENT: null,
		$P_ITEM: null,
		$P_BTN: null,

		init: function() {
			this.$P_CONTENT = $SECT_MEDIA.find('.content-container');
			this.$P_ITEM = $SECT_MEDIA.find('.prayer-list ul li');
			this.$P_BTN = this.$P_ITEM.find('a');
			this.prayer_content_update(0);

			this.$P_BTN.on('click', this.prayer_btn_on.bind(this));
		},

		prayer_btn_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();
		   
		    this.prayer_content_update($(e.target).parent().index());
		},

		prayer_content_update: function(id) {
			var $ITEM = this.$P_ITEM.eq(id);
			this.$P_ITEM.removeClass('selected');
			$ITEM.addClass('selected');
			this.$P_CONTENT.html($ITEM.find('.content').html());

			if (OBJ_MAIN.getM_view())
			{
				$ROOT.animate({
			        scrollTop: $ITEM.offset().top - 100
			    }, 500, 'easeInOutCubic');
			}
			else
			{
				OBJ_MAIN.anchorAnim(3, 'prayers');
			}
		    
		}
	};

	var oneCommunity_handler = {
		$G_FINDER: null,
		$G_NAV: null,
		$G_FINDER_UL: null,
		$REGION: null,
		$REGION_ITEM: null,
		$REGION_BTN: null,
		$REGION_FULL_BTN: null,
		$REGION_MODAL: null,
		$REGION_MODAL_CLOSE_BTN: null,

		r_total: null,
		r_name: [],
		r_map: null,
		r_map_info: null,
		info_text: null,

		r_coord: [],
		r_poly: [],
		r_poly_color: ["#68adcb", "#78cac0", "#97b76e", "#8776b6", "#c0b563", "#5a748c", "#d08fae", "#4d4d4d"],

		init: function() {
			this.$G_FINDER = $CONTENT_SECT.find('.group-finder .container');
			this.$G_NAV = this.$G_FINDER.find('.finder-nav a');
			this.$G_FINDER_UL = this.$G_FINDER.find('ul');

			this.$REGION = $CONTENT_SECT.find('.regional .container');
			this.$REGION_ITEM = this.$REGION.find('.regional-list ul li');
			this.$REGION_BTN = this.$REGION_ITEM.find('a.map-btn');
			this.$REGION_FULL_BTN = $CONTENT_SECT.find('.regional .fullscreen-btn');
			
			this.$G_NAV.on('click', this.g_nav_on.bind(this));
			this.g_finder_update(0, 'all');

			this.$REGION_BTN.on('click', this.r_btn_on.bind(this));
			this.r_total = this.$REGION_ITEM.length;

			this.$REGION_ITEM.each(function(i) {
				oneCommunity_handler.r_name.push($(this).find('a.map-btn').text());
			});
			this.region_map_init("r_map", 12);
			this.$REGION_FULL_BTN.on('click', this.region_fullscreen.bind(this));
		},

		g_nav_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.target);
		    var id = $THIS.index();
		    if (id > 0) id = id / 2;

		    this.g_finder_update(id, $THIS.attr('class'));
		},

		g_finder_update: function(id, type) {
			this.$G_NAV.removeClass('selected');
			this.$G_NAV.eq(id).addClass('selected');

			this.$G_FINDER_UL.removeClass();
			this.$G_FINDER_UL.addClass(type);

		    OBJ_MAIN.pSectUpdate();
		},

		r_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.target);
		    var id = $THIS.parent().index();

		    if (this.$REGION_ITEM.eq(id).hasClass('on')) this.region_off(id);
		    else this.region_on(id);
		},

		region_on: function(id) {
			this.$REGION_ITEM.removeClass();
			this.$REGION_ITEM.eq(id).addClass('on');
			this.region_map_select(id);
		},

		region_off: function(id) {
			this.$REGION_ITEM.removeClass();
			this.region_map_select();
		},

		region_fullscreen: function(e) {
			e.stopPropagation();
		    e.preventDefault();
			oneCommunity_handler.full_map_show();
		},

		region_callback: function() {
			oneCommunity_handler.region_map_init("r_map", 12);
			oneCommunity_handler.$REGION_ITEM.removeClass();
		},

		region_map_init: function(elm, zoom_val) {
	        this.r_map = new google.maps.Map(document.getElementById(elm), {
	            center: {lat: 40.755, lng: -73.800},
	            zoom: zoom_val,
	            disableDefaultUI: true,
	            // mapTypeControl: false,
	            // scaleControl: false,
	            zoomControl: true,

	            styles: [
		            {
		            	featureType: 'all',
		            	stylers: [
		                	{ saturation: -100 }
		              	]
		            },
		            {
		            	featureType: 'water',
				        elementType: 'geometry',
				        stylers: [
				            {
				                'color': '#6d6d6d'
				            }
				        ]
		            },
		            {
		            	featureType: 'road.arterial',
		            	elementType: 'geometry',
		            	stylers: [
		                	{ hue: '#000000' },
		                	{ saturation: 50 }
		              	]
		            },
		            {
		            	featureType: 'poi.business',
		            	elementType: 'labels',
		            	stylers: [
		                	{ visibility: 'off' }
		              	]
		            }
		        ]
	        });

	        for (var i = 0; i < this.r_total; i ++)
	        {
	        	this.r_coord[i] = null;
	        	this.r_poly[i] = null;
	        	this.r_coord[i] = OBJ_RDATA.get(i);
	        }

	        this.r_map_info = new google.maps.InfoWindow;
	        this.region_map_select();
	    },

	    region_map_select: function(id) {
	    	for (var j = 0; j < this.r_total; j ++)
	    	{
	    		if (this.r_poly[j] != null)
	    		{
	    			this.r_poly[j].setMap(null);
	    			this.r_poly[j] = null;
	    		}

	    		this.r_map_info.close(this.r_map);
	    	}

	    	if (id != null)
	    	{
	    		this.r_poly[id] = new google.maps.Polygon({
		        	paths: this.r_coord[id],
		        	strokeColor: '#7d7d7d',
		        	strokeOpacity: 1,
		        	strokeWeight: 2,
		        	fillColor: this.r_poly_color[id],
		        	fillOpacity: 0.5
		        });

		        this.r_poly[id].r_id = id;
		        this.r_poly[id].setMap(this.r_map);
		        this.r_poly[id].addListener('click', function(e) {
		        	oneCommunity_handler.info_text = "<span style='color:#000;font-weight:700;'>" + oneCommunity_handler.r_name[this.r_id] + "</span>";
		        	oneCommunity_handler.showMapWindow(e);
		        }, false);	
	    	}
	    	else
	    	{
	    		for (var i = 0; i < this.r_total; i ++)
		    	{
		    		this.r_poly[i] = new google.maps.Polygon({
			        	paths: this.r_coord[i],
			        	strokeColor: '#7d7d7d',
			        	strokeOpacity: 1,
			        	strokeWeight: 2,
			        	fillColor: this.r_poly_color[i],
			        	fillOpacity: 0.5
			        });

			        this.r_poly[i].r_id = i;
			        this.r_poly[i].setMap(this.r_map);
			        this.r_poly[i].addListener('click', function(e) {
			        	oneCommunity_handler.info_text = "<span style='color:#000;font-weight:700;'>" + oneCommunity_handler.r_name[this.r_id] + "</span>";
			        	oneCommunity_handler.showMapWindow(e);
			        }, false);
		    	}
	    	}
		},

		showMapWindow: function(e) {
	        oneCommunity_handler.r_map_info.setContent(oneCommunity_handler.info_text);
	        oneCommunity_handler.r_map_info.setPosition(e.latLng);
	        oneCommunity_handler.r_map_info.open(oneCommunity_handler.r_map);
	    },

	    full_map_show: function() {
			this.$REGION_MODAL = $('.r_map_full_modal');
			this.$REGION_MODAL_CLOSE_BTN = this.$REGION_MODAL.find('.close-btn');
			this.$REGION_MODAL_CLOSE_BTN.on('click', this.full_map_hide.bind(this));

			$BODY.addClass('lock-scroll');
			this.$REGION_MODAL.fadeIn(250, 'easeInOutCubic');
			oneCommunity_handler.region_map_init("r_map_full", 13);
		},

		full_map_hide: function(e) {
			e.stopPropagation();
		    e.preventDefault();
		    
		    $BODY.removeClass('lock-scroll');
			oneCommunity_handler.$REGION_MODAL.fadeOut(250, 'easeInOutCubic', function() {
				oneCommunity_handler.$REGION_MODAL = null;
				oneCommunity_handler.$REGION_MODAL_CLOSE_BTN = null;
				oneCommunity_handler.region_callback();
			});
		}
	};

	var ourParish_handler = {
		$P_GRID: null,
		$P_NAV_L: null,
		$P_NAV_R: null,
		$P_GRID_UL: null,
		$P_GRID_ITEM: null,
		$H_LIST: null,
		$H_ITEM: null,
		$H_TL: null,
		$H_BTN: null,
		$PHOTO_BTN: null,

		h_height: 0,
		h_total: 0,
		h_id: 0,

		init: function() {
			this.$P_GRID = $CONTENT_SECT.find('.priests .container');
			this.$P_NAV_L = this.$P_GRID.find('.grid-nav a').eq(0);
			this.$P_NAV_R = this.$P_GRID.find('.grid-nav a').eq(1);
			this.$P_GRID_UL = this.$P_GRID.find('.row ul');
			this.$P_GRID_ITEM = this.$P_GRID_UL.find('li');

			this.$H_LIST = $CONTENT_SECT.find('.history-list .container');
			this.$H_ITEM = this.$H_LIST.find('ul li');
			this.$H_TL = this.$H_LIST.find('.timeline');
			this.$H_BTN = this.$H_LIST.find('.show-more');

			this.$PHOTO_BTN = $CONTENT_SECT.find('a.photo-btn');
			
			this.p_grid_update('current');
			this.$P_NAV_L.on('click', this.p_nav_on.bind(this));
			this.$P_NAV_R.on('click', this.p_nav_on.bind(this));

			this.h_total = this.$H_ITEM.length;
			this.$H_LIST.removeClass('done');
			this.$H_BTN.removeClass('hide');

			this.h_list_update(5);
			this.$H_BTN.on('click', this.h_btn_on.bind(this));

			this.$PHOTO_BTN.on('click', this.photo_btn_on.bind(this));
		},

		p_nav_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    if ($(e.target).index() <= 0) this.p_grid_update();
		    else this.p_grid_update('current');
		},

		p_grid_update: function(str) {
			this.$P_GRID_ITEM.removeClass('show');

		    if (str == "current")
		    {
		    	this.$P_NAV_L.removeClass('selected');
		    	this.$P_NAV_R.addClass('selected');
		    	this.$P_GRID_UL.addClass(str);

		    	this.$P_GRID_ITEM.each(function(i) {
		    		if ($(this).hasClass('cur') || $(this).hasClass('cur-only'))
		    		{
		    			ourParish_handler.p_item_show(i, 1);
		    		}
		    	});
		    }
		    else
		    {
		    	this.$P_NAV_R.removeClass('selected');
		    	this.$P_NAV_L.addClass('selected');
		    	this.$P_GRID_UL.removeClass();
		    	
		    	var n = 0;
		    	this.$P_GRID_ITEM.each(function(i) {
		    		if (!$(this).hasClass('cur-only'))
		    		{
		    			ourParish_handler.p_item_show(i, n);
		    			n ++;
		    		}
		    	});
		    }

		    OBJ_MAIN.pSectUpdate();
		},

		p_item_show: function(id, delay) {
			setTimeout(function() {
				ourParish_handler.$P_GRID_ITEM.eq(id).addClass('show');
			}, 100 * delay);
		},

		h_btn_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    var n = (this.h_id < (this.h_total - 1)) ? this.h_id + 10 : this.h_total - 1;

		    if (n >= (this.h_total - 1))
		    {
		    	this.$H_LIST.addClass('done');
		    	this.$H_BTN.addClass('hide');
		    }

		    this.h_list_update(n);
		},

		h_list_update: function(id) {
			this.$H_TL.css('height', this.h_height);

			for (var i = this.h_id; i < id; i ++)
			{
				this.$H_ITEM.eq(i).addClass('on');
				this.h_item_show(i, (i - this.h_id));

				if (i >= (id-1))
				{
					this.h_height = this.$H_LIST.height();
					this.$H_TL.css('height', this.h_height);

					setTimeout(function() {
						ourParish_handler.$H_TL.removeAttr('style');
					}, 550);
				}
			}

			OBJ_MAIN.pSectUpdate();
			this.h_id = id;
		},

		h_item_show: function(id, delay) {
			setTimeout(function() {
				ourParish_handler.$H_ITEM.eq(id).addClass('show');
			}, (150 * delay) + 150);
		},

		photo_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.target).parent().parent().find('.thumbnail').html();

		    modal_layer.show('<div class="full-content">' + $THIS + '</div>', ourParish_handler.photo_callback);
		},

		photo_callback: function() {
			console.log("cb - ourParish");
		}
	};

	var educationCenter_handler = {
		$PHOTO_BTN: null,

		init: function() {
			this.$PHOTO_BTN = $CONTENT_SECT.find('a.photo-btn');

			this.$PHOTO_BTN.on('click', this.photo_btn_on.bind(this));
		},

		photo_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.target).parent().parent().find('.thumbnail').html();

		    modal_layer.show('<div class="full-content">' + $THIS + '</div>', educationCenter_handler.photo_callback);
		},

		photo_callback: function() {
			console.log("cb - educationCenter");
		}
	};

	var mediaLibrary_handler = {
		$PHOTO_BTN: null,

		init: function() {
			this.$PHOTO_BTN = $CONTENT_SECT.find('a.photo-btn');

			this.$PHOTO_BTN.on('click', this.photo_btn_on.bind(this));
		},

		photo_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.target).parent().parent().find('.thumbnail').html();

		    modal_layer.show('<div class="full-content">' + $THIS + '</div>', mediaLibrary_handler.photo_callback);
		},

		photo_callback: function() {
			console.log("cb - mediaLibrary");
		}
	}

	var modal_layer = {
		$MODAL: null,
		$MODAL_CLOSE_BTN: null,
		$MODAL_CONTENT: null,
		cbHolder: null,

		init: function () {
			this.$MODAL = $('#modal-layer');
			this.$MODAL_CLOSE_BTN = this.$MODAL.find('.close-btn');
			this.$MODAL_CONTENT = this.$MODAL.find('.container');
			this.$MODAL_CLOSE_BTN.on('click', this.hide.bind(this));
		},

		show: function(content, cb) {
			this.init();
			if (cb) this.cbHolder = cb;
			this.$MODAL_CONTENT.html(content);
			this.$MODAL.fadeIn(250, 'easeInOutCubic');
			$BODY.addClass('lock-scroll');
		},

		hide: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    if (modal_layer.cbHolder != null) modal_layer.cbHolder();
		    $BODY.removeClass('lock-scroll');
			modal_layer.$MODAL.fadeOut(250, 'easeInOutCubic', function() {
				// modal_layer.$MODAL_CLOSE_BTN.off();
				modal_layer.$MODAL = null;
				modal_layer.$MODAL_CLOSE_BTN = null;
				modal_layer.$MODAL_CONTENT = null;
			});
		}
	};

	return {
		init: init,
		handler: handler,
		modalOn: function(content, cb) { modal_layer.show(content, cb); },
		modalOff: function() { modal_layer.hide(); }
	};
})(jQuery);