// JavaScript Document

'use strict';

$(document).ready(function(e) {
	
	//top product slider
	var product_slider = $('#product-slider');
	if(product_slider.length == 1) {
		product_slider.on('initialized.owl.carousel', function(e) {
			product_slider.find('.owl-dot').css('width', (100 / e.item.count) + '%');
		});
		product_slider.owlCarousel({
			items: 1,
			nav: true,
			navText: false,
			smartSpeed: 1200,
			autoplay: true,
			autoplayHoverPause: true,
			loop: true
		});
	}
	
	
	
	//menu slider
	var menu_slider = $('#menu-slider');
	if(menu_slider.length == 1) {
		menu_slider.owlCarousel({
			nav: true,
			navText: false,
			dots: false,
			smartSpeed: 1000,
			margin: 30,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				992:{
					items:3
				}
			}
		});
	}
	
	
	
	//menu slider chinese
	var menu_slider_chinese = $('#menu-slider-chinese');
	if(menu_slider_chinese.length == 1) {
		menu_slider_chinese.owlCarousel({
			nav: true,
			navText: false,
			dots: false,
			smartSpeed: 1000,
			margin: 30,
			responsive:{
				0:{
					items:1
				},
				992:{
					items:2
				}
			}
		});
	}

	
	
	
	//testimonial slider
	var testimonial_slider = $('#testimonial-slider');
	if(testimonial_slider.length == 1) {
		testimonial_slider.owlCarousel({
			items: 1,
			smartSpeed: 1000,
			margin: 70,
			loop: true
		});
	}
	

	
	//single sliders
	var single_sliders = $('.slider-single');
	for(var i=0, len=single_sliders.length; i<len; i++) {
		single_sliders.eq(i).owlCarousel({
			items: 1,
			smartSpeed: 1000
		});
	}
	
	
	
	//product size radio
	var product_size_els = $('.product-size');
	
	function productSizeHandler(el) {
		var input = el.find('input[type=radio]');
		if(input.is(':checked'))
			el.addClass('active');
		input.on('change', function(e) {
			product_size_els.removeClass('active');
			el.addClass('active');
		});
	}
	
	for(var i=0, len=product_size_els.length; i<len; i++) {
		productSizeHandler(product_size_els.eq(i));
	}
	
	
	
	//product detail
	var product_details = $('.product-detail');
	var product_details_container = $('#product-details');
	var product_detail_triggers = $('.product-detail-trigger');
	
	function productDetailHandler(trigger_el) {
		var product_detail_el = $(trigger_el.data('product-detail'));
		if(product_detail_el.length == 1) {
			if(!trigger_el.hasClass('active'))
				product_detail_el.hide();
			trigger_el.on('click', function(e) {
				product_detail_triggers.removeClass('active');
				$(this).addClass('active');
				product_details.stop().slideUp('slow', 'linear');
				product_detail_el.stop().slideDown('slow', 'linear');
				
				//if product details outside the screen slide to them
				if($(window).scrollTop() + $(window).height() - 200 < product_details_container.offset().top) {
					$.scrollTo(product_details_container.offset().top - 100, 800, { axis:'y' });
				}
			});
		}
	}
	
	for(var i=0, len=product_detail_triggers.length; i<len; i++) {
		productDetailHandler(product_detail_triggers.eq(i));
	}
	
	
	
	//form submit triggers
	var form_trigger_els = $('.form-submit-trigger');
	for(var i=0, len=form_trigger_els.length; i<len; i++) {
		form_trigger_els.eq(i).on('click', function(e) {
			e.preventDefault();
			$(this).parents('form').trigger('submit');
		});
	}
	
	
	
	//one-page menu navigation
	var one_page_nav = $('#one-page-nav');
	if(one_page_nav.length == 1) {
		one_page_nav.onePageNav({
			currentClass: 'active'
		});
	}
	
	
	
	//sticky menu
	var main_navigation_el = $('#main-navigation-container');
	var main_navigation_in_el = $('#main-navigation-inner');
	var main_nav_placeholder_el = $('#main-navigation-placeholder');
	if(main_navigation_el.length == 1) {
		var window_el = $(window);
		var main_nav_fixed = false;
		var main_nav_breakpoint = 800;
		
		//set menu placeholder when menu has fixed position
		main_nav_placeholder_el.height(main_navigation_el.outerHeight());
		
		window_el.on('scroll', function(e) {
			if(window_el.scrollTop() > main_nav_breakpoint) {
				if(main_nav_fixed == false) {
					main_navigation_el.addClass('fixed-pos active');
					main_nav_fixed = true;
				}
			}
			else {
				if(main_nav_fixed == true) {
					if(Modernizr.csstransitions) {
						main_navigation_in_el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
						main_navigation_el.removeClass('active');
						main_navigation_in_el.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
							main_navigation_el.removeClass('fixed-pos');
						});
					}
					else {
						main_navigation_el.removeClass('fixed-pos active');
						main_nav_placeholder_el.removeClass('active');
					}
					main_nav_fixed = false;
				}
			}
		})
		.on('resize', function(e) {
			if(main_nav_fixed) {
				main_navigation_el.removeClass('fixed-pos');
				main_nav_placeholder_el.height(main_navigation_el.outerHeight());
				main_navigation_el.addClass('fixed-pos');
			}
			else
				main_nav_placeholder_el.height(main_navigation_el.outerHeight());
		});
	}
	
	
	
	//mobile menu open/close
	var main_menu = $('#main-navigation');
	var main_menu_button = $('#main-navigation-button');
	main_menu_button.on('click', function(e) {
		main_menu.toggleClass('active');
	});
	
	
	
	//menu submenus open/close
	var menu_items = $('#main-navigation li');
	var submenu;
	for(var i=0, len=menu_items.length; i<len; i++) {
		submenu = menu_items.eq(i).children('ul');
		if(submenu.length == 1)
			submenuHandler(menu_items.eq(i), submenu);
	}
	
	function submenuHandler(menu_item, submenu) {
		menu_item.on('mouseenter', function(e) {
			submenu.stop().slideDown();
		})
		.on('mouseleave', function(e) {
			submenu.stop().slideUp();
		});;
	}
	
	
	
	//cart trigger
	var screen_cover = $('#screen-cover');
	var cart = $('#cart');
	$('.cart-trigger').on('click', function(e) {
		e.preventDefault();
		var cart_top_pos = $(window).scrollTop();
		if(cart_top_pos + cart.height() > $(document).height()) {
			$.scrollTo(0, 800, { axis:'y' });
			cart_top_pos = 0;
		}
		cart.css('top', cart_top_pos + 'px');
		cart.toggleClass('active');
		screen_cover.toggleClass('active');
	});
	
	screen_cover.on('click', function(e) {
		cart.removeClass('active');
		screen_cover.removeClass('active');
	});
	
	
	
	//product pieces add/remove buttons
	var product_pieces = $('.product-pieces');
	for(var i=0, len=product_pieces.length; i<len; i++) {
		if(product_pieces.eq(i).hasClass('product-pieces-readonly'))
			continue;
		productPieceBtns(product_pieces.eq(i));
	}
	
	function productPieceBtns(el) {
		var value;
		var input = el.find('input[type=text]');
		el.find('.product-pieces-up').on('click', function(e) {
			value = parseInt(input.val(), 10);
			if(!value || value < 0)
				value = 0;
			input.val(value+1);
		});
		el.find('.product-pieces-down').on('click', function(e) {
			value = parseInt(input.val(), 10);
			if(!value || value < 1)
				value = 1;
			input.val(value-1);
		});
	}
	
	
	
	// on-scroll animations
	var on_scroll_anims = $('.onscroll-animate');
	for (var i=0, len=on_scroll_anims.length; i<len; i++) {
		var element = on_scroll_anims.eq(i);
		element.one('inview', function (event, visible) {
			var el = $(this);
			var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
			var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;

			var timer = setTimeout(function() {
				el.addClass(anim);
				clearTimeout(timer);
			}, delay);
		});
	}
	
	
	
	googleMap();
	
	/* Google Map */
	function googleMap() {
		var map_canvas = $('#map-canvas');
		if(map_canvas.length == 0)
			return;
		var map;
		var image = 'assets/images/map_marker.png';		// marker icon
		var myLatlng = new google.maps.LatLng(40.714728,-73.998672);    //position of the map marker
		var center = new google.maps.LatLng(40.714728,-74.050672);      //center of the map
		function mapInitialize() {
			var mapOptions = {
				scrollwheel: false,
				zoom: 12,
				center: center
			};
			map = new google.maps.Map(map_canvas.get(0), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image
			});
		}
		google.maps.event.addDomListener(window, 'load', mapInitialize);
	}
	
	
	
	//in-page scrolling
	var scroll_top_offset = -77;	//because of fixed menu on one-page
	$('.scroll-to').on('click', function(e) {
		$.scrollTo($(this).attr('href'), 800, { axis: 'y', offset: scroll_top_offset });
	});
	
	
	
	//scroll top
	$('#scroll-top').on('click', function(e) {
		$.scrollTo(0, 800, { axis:'y' });
	});
	
	
	//contact form
	$('#form-contact').on('submit', function(e) {
		return form_to_ajax_request($(this), ['name', 'email', 'subject', 'message'], ['name', 'email', 'message']);
	});
	
	//newsletter form
	$('#form-newsletter').on('submit', function(e) {
		return form_to_ajax_request($(this), ['email'], ['email']);
	});
});

$(window).load(function() {
	//hide page loader
	var page_loader_el = $('#page-loader');
	page_loader_el.addClass('page-loaded');
	
	//wait untill page loaders transition ends and then add class to stop the animations
	if(!Modernizr.csstransitions) {
		page_loader_el.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			page_loader_el.addClass('page-loader-hidden');
		});
	}
	else
		page_loader_el.addClass('page-loader-hidden');
	
	
	
	//specials section slider with thumbnails
	var slider_specials = $('#slider-specials');
	var slider_specials_thumbs = $('#slider-specials-thumbs');
	if(slider_specials.length == 1 && slider_specials_thumbs.length == 1) {
		slider_specials_thumbs.flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: 218,
			itemMargin: 20,
			prevText: "",
			nextText: "",
			asNavFor: '#slider-specials'
		});
		
		slider_specials.flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			prevText: "",
			nextText: "",
			sync: "#slider-specials-thumbs"
		});
	}

	
	
	//gallery mansory and filter
	var gallery = $('#gallery');
	if(gallery.length == 1) {
		var gallery_isotope = gallery.isotope({
			itemSelector: '.gallery-item',
			masonry: {
				columnWidth: '.gallery-item'
			}
		});
		
		//isotope filter
		var gallery_isotope_filters = $('#gallery-filter .isotope-filter');
		var active_filter = gallery_isotope_filters.filter('.active');
		if(active_filter.length == 1) {
			gallery_isotope.isotope({ filter: active_filter.data('filter') });
		}
		gallery_isotope_filters.on('click', function(e) {
			e.preventDefault();
			gallery_isotope_filters.removeClass('active');
			$(this).addClass('active');
			gallery_isotope.isotope({ filter: $(this).data('filter') });
		});
	}
	
	
	
	//parallax backgrounds
	var parallax_backgrounds = $('.parallax-background');
	for (var i=0; i<parallax_backgrounds.length; i++) {
		var el = parallax_backgrounds.eq(i);
		if(!el.attr("data-stellar-background-ratio"))
        	el.attr('data-stellar-background-ratio', 0.4);
    }
	
	if (!Modernizr.touch) {
		if(typeof($.stellar) === 'function') {
			$.stellar({
				horizontalScrolling: false,
				responsive: true,
			});
			
			//flexslider seems to make some mess with this parallax, firing window resize after init should help
			$(window).trigger('resize');
		}
	}
});



//youtube video section
var video_main_player;
var video_main_el = $('#video-main');

/* Youtube video player - add API
	It's important to add the api script as close as onYouTubePlayerAPIReady function, otherwise problems might appear
*/
if(video_main_el.length == 1) {
	var tag = document.createElement('script');
	tag.src = "http://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubePlayerAPIReady() {
	// create the global player from the specific iframe (#video-main)
	if(video_main_el.length == 1) {
		video_main_player = new YT.Player('video-main', {
			events: {
				// call this function when player is ready to use
				'onReady': onPlayerReady
			}
		});
	}
}

function onPlayerReady() {
	$("#video-main-play").on('click', function(e) {
		e.preventDefault();
		video_main_el.addClass('active');
		video_main_player.playVideo();
	});
}



//placeholder fallback for old browsers
if ( !("placeholder" in document.createElement("input")) ) {
    $("input[placeholder], textarea[placeholder]").each(function() {
	    var val = $(this).attr("placeholder");
        if ( this.value == "" ) {
    	    this.value = val;
        }
        $(this).focus(function() {
        	if ( this.value == val ) {
            	this.value = "";
            }
       	}).blur(function() {
        	if ( $.trim(this.value) == "" ) {
            	this.value = val;
            }
        })
  	});
 
    // Clear default placeholder values on form submit
    $('form').submit(function() {
    	$(this).find("input[placeholder], textarea[placeholder]").each(function() {
        	if ( this.value == $(this).attr("placeholder") ) {
            	this.value = "";
            }
        });
    });
}





/*	
  create ajax request from form element and his fields
  messages: set as form "data" attribut - "[field name]-not-set-msg", "all-fields-required-msg", "ajax-fail-msg", "success-msg"
  form must have attributes "method" and "action" set
  "return message" and "ajax loader" are also managed - see functions below
  
  @param form_el - form element
  @param all_fields - array of names of all fields in the form element that will be send
  @param required_fields - array of names of all fields in the form element that must be set - cannot be empty
*/
function form_to_ajax_request(form_el, all_fields, required_fields) {
	var fields_values = [];
	var error = false;
	
	//get values from fields
	$.each(all_fields, function(index, value) {
		fields_values[value] = form_el.find('*[name=' + value + ']').val();
	});
	
	//check if required fields are set
	$.each(required_fields, function(index, value) {
		if(!isSet(fields_values[value])) {
			var message = form_el.data(value + '-not-set-msg');
			if(!isSet(message))
				message = form_el.data('all-fields-required-msg');
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
			error = true;
			return;
		}
	});
	if(error)
		return false;
	
	//form data query object for ajax request
	var data_query = {};
	$.each(all_fields, function(index, value) {
		data_query[value] = fields_values[value];
	});
	data_query['ajax'] = true;

	//show ajax loader
	showLoader(form_el);
	
	//send the request
	$.ajax({
		type: form_el.attr('method'),
		url: form_el.attr('action'),
		data: data_query,
		cache: false,
		dataType: "text"
	})
	.fail(function() {		//request failed
		setReturnMessage(form_el, form_el.data('ajax-fail-msg'));
		showReturnMessage(form_el);
	})
	.done(function(message) {		//request succeeded
		if(!isSet(message)) {
			clearForm(form_el);
			setReturnMessage(form_el, form_el.data('success-msg'));
			showReturnMessage(form_el);
		}
		else {
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
		}
	});
	
	//hide ajax loader
	hideLoader(form_el);
	
	return false;
}

function isSet(variable) {
	if(variable == "" || typeof(variable) == 'undefined')
		return false;
	return true;
}

function clearForm(form_el) {
	form_el.find('input[type=text]').val('');
	form_el.find('input[type=checkbox]').prop('checked', false);
	form_el.find('textarea').val('');
}

function showLoader(form_el) {
	form_el.find('.ajax-loader').fadeIn('fast');
}

function hideLoader(form_el) {
	form_el.find('.ajax-loader').fadeOut('fast');
}
	
function setReturnMessage(form_el, content) {
	if(!isSet(content))
		content = "Unspecified message.";
	form_el.find('.return-msg').html(content);
}

function showReturnMessage(form_el) {
	form_el.find('.return-msg').addClass('show-return-msg');
}

$('.return-msg').on('click', function(e) {
	$(this).removeClass('show-return-msg');
});
