/**
	Template Name 	 : PlantZone
	Author			 : DexignZone
	Version			 : 1.0
	File Name	     : custom.js
	Author Portfolio : https://themeforest.net/user/dexignzone/portfolio
	
	Core script to handle the entire theme and core functions
**/

var PlantZone = function(){
	/* Search Bar ============ */
	siteUrl = '';
	
	var screenWidth = $( window ).width();
	
	/* Cookies Function */
	function setCookie(cname, cvalue, exhours){
		var d = new Date();
		d.setTime(d.getTime() + (30*60*1000)); /* 30 Minutes */
		var expires = "expires="+ d.toString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname){
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function deleteCookie(cname){
		var d = new Date();
		d.setTime(d.getTime() + (1)); // 1/1000 second
		var expires = "expires="+ d.toString();
		document.cookie = cname + "=1;" + expires + ";path=/";
	}

	function deleteAllCookie(reload = true){
		jQuery.each(themeOptionArr, function(optionKey, optionValue) {
				deleteCookie(optionKey);
		});
		if(reload){
			location.reload();
		}
	}
	/* Cookies Function END */
	
	
	var homeSearch = function() {
		'use strict';
		/* top search in header on click function */
		var quikSearch = jQuery("#quik-search-btn");
		var quikSearchRemove = jQuery("#quik-search-remove");
		
		quikSearch.on('click',function() {
			jQuery('.dz-quik-search').fadeIn(500);
			jQuery('.dz-quik-search').addClass('On');
		});
		
		quikSearchRemove.on('click',function() {
			jQuery('.dz-quik-search').fadeOut(500);
			jQuery('.dz-quik-search').removeClass('On');
		});	
		/* top search in header on click function End*/
	}
	
	/* WOW ANIMATION ============ */
	var wow_animation = function(){
		if($('.wow').length > 0)
		{
			var wow = new WOW(
			{
			  boxClass:     'wow',      // animated element css class (default is wow)
			  animateClass: 'animated', // animation css class (default is animated)
			  offset:       50,          // distance to the element when triggering the animation (default is 0)
			  mobile:       false       // trigger animations on mobile devices (true is default)
			});
			
			setTimeout(function(){
				wow.init();
			}, 2100);
		}	
	}
	
	/* One Page Layout ============ */
	var onePageLayout = function() {
		'use strict';
		var headerHeight =   parseInt($('.onepage').css('height'), 10);
		
		$(".scroll").unbind().on('click',function(event) 
		{
			event.preventDefault();
			
			if (this.hash !== "") {
				var hash = this.hash;	
				var seactionPosition = $(hash).offset().top;
				var headerHeight =   parseInt($('.onepage').css('height'), 10);
				
				
				$('body').scrollspy({target: ".navbar", offset: headerHeight+2}); 
				
				var scrollTopPosition = seactionPosition - (headerHeight);
				
				$('html, body').animate({
					scrollTop: scrollTopPosition
				}, 800, function(){
					
				});
			}   
		});
		$('body').scrollspy({target: ".navbar", offset: headerHeight + 2});  
	}

	
	/* Header Height ============ */
	var handleResizeElement = function(){
		var headerTop = 0;
		var headerNav = 0;
		
		$('.header .sticky-header').removeClass('is-fixed');
		$('.header').removeAttr('style');
		
		if(jQuery('.header .top-bar').length > 0 &&  screenWidth > 991)
		{
			headerTop = parseInt($('.header .top-bar').outerHeight());
		}

		if(jQuery('.header').length > 0 )
		{
			headerNav = parseInt($('.header').height());
			headerNav =	(headerNav == 0)?parseInt($('.header .main-bar').outerHeight()):headerNav;
		}	
		
		var headerHeight = headerNav + headerTop;
		
		jQuery('.header').css('height', headerHeight);
	}


	
	var handleResizeElementOnResize = function(){
		var headerTop = 0;
		var headerNav = 0;
		
		$('.header .sticky-header').removeClass('is-fixed');
		$('.header').removeAttr('style');
		
		
		setTimeout(function(){
			
			if(jQuery('.header .top-bar').length > 0 &&  screenWidth > 991)
			{
				headerTop = parseInt($('.header .top-bar').outerHeight());
			}

			if(jQuery('.header').length > 0 )
			{
				headerNav = parseInt($('.header').height());
				headerNav =	(headerNav == 0)?parseInt($('.header .main-bar').outerHeight()):headerNav;
			}	
			
			var headerHeight = headerNav + headerTop;
			
			jQuery('.header').css('height', headerHeight);
		
		}, 500);
    }
	
	/* Load File ============ */
	var dzTheme = function(){
		'use strict';
		
	/* 	if(screenWidth <= 991 ){
			jQuery('.navbar-nav > li > a, .sub-menu > li > a, .navbar-nav > li > a > i, .sub-menu > li > a > i').unbind().on('click', function(e){
				
				
				if(jQuery(this).parent('li').has('ul').length > 0){e.preventDefault();}
				
				if(jQuery(this).parent().hasClass('open'))
				{
					jQuery(this).parent().removeClass('open');
				}else{
					if(jQuery(this).hasClass('sub-menu'))
					{
						jQuery(this).parent().addClass('open');
					}else{
						jQuery(this).parent().parent().find('li').removeClass('open');
						jQuery(this).parent().addClass('open');
					}
				}  
			});
		} */
		
		if(screenWidth <= 991 ){
			
			var menuObj ;
			 jQuery('.navbar-nav > li > a, .sub-menu > li > a, .navbar-nav > li > a > i, .sub-menu > li > a > i')
				.unbind()
				.on({
					click: function(e){
						menuObj = jQuery(this);
						handleMenus(e, menuObj);
					},
					keypress: function(e){
						if(e.key !== 'Enter') {
							return false;
						}
						menuObj = jQuery(this);
						handleMenus(e, menuObj);	
					},
				});
			jQuery('.tabindex').attr("tabindex","0");	
			function handleMenus(e, menuObj){
				
				if(menuObj.parent('li').has('ul').length > 0){e.preventDefault();}					
					
					/* if(jQuery('.navbar-nav-scroll').length > 0){						
						jQuery(document).on("scroll", pageOnScroll);					
						var headerFullHeight =   parseInt($('.main-bar').css('height'), 10);						
						
						jQuery('.navbar-nav-scroll a[href^="#"]').on('click', function (e) {
							e.preventDefault();
							jQuery(document).off("scroll");							
							jQuery('.navbar-nav-scroll a').each(function () {								
								menuObj.parent('li').removeClass('active');
							})				
							menuObj.parent('li').addClass('active');							
							var target = e.hash,							
							menu = target;
							var $target = $(target);							
							if($target.length > 0){					
								jQuery('html, body').stop().animate({						
									'scrollTop': $target.offset().top - headerFullHeight
								}, 500, 'swing', function () {
									jQuery(document).on("scroll", pageOnScroll);
								});
							}
						});
					}		 */

					/* if(menuObj.closest('li').children('ul').length > 0 ){
						jQuery('.header-nav').removeClass('collapsed').addClass('collapse show');
					}else{
						jQuery('.navbar-toggler').removeClass('open').addClass('collapsed');
						jQuery('.header-nav').removeClass('show');
					} */
				
				if(menuObj.parent().hasClass('open')){
					menuObj.parent().removeClass('open');
				}else{
					if(menuObj.hasClass('sub-menu')){
						menuObj.parent().addClass('open');
					}else{
						menuObj.parent().parent().find('li').removeClass('open');
						menuObj.parent().addClass('open');
					}
				}
			 }			
		}else{
			jQuery('.tabindex').removeAttr("tabindex");	
		}

		jQuery('.menu-btn, .openbtn').on('click',function(){
			jQuery('.contact-sidebar').addClass('active');
		});
		jQuery('.menu-close').on('click',function(){
			jQuery('.contact-sidebar').removeClass('active');
			jQuery('.menu-btn').removeClass('open');
		});
		
		jQuery('.dz-carticon').on('click',function(){
			jQuery(this).toggleClass('active');
		});
		jQuery('.dz-refresh').on('click',function(){
			jQuery(this).toggleClass('active');
		});
		jQuery('.dz-wishicon').on('click',function(){
			jQuery(this).toggleClass('active');
		});
	}
	//lightGallery
	var handleLightgallery = function() {
		if(jQuery('#lightgallery').length > 0){
			lightGallery(document.getElementById('lightgallery'), {
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail:true,
				exThumbImage: 'data-src'
            });
		}
		if(jQuery('#lightgallery2').length > 0){
			lightGallery(document.getElementById('lightgallery2'), {
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail:true,
				exThumbImage: 'data-src'
            });
		}
		if(jQuery('#lightgallery3').length > 0){
			lightGallery(document.getElementById('lightgallery3'),{
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail:true,
				exThumbImage: 'data-src'
            });
		}
		if(jQuery('#lightgallery4').length > 0){
			lightGallery(document.getElementById('lightgallery4'),{
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail:true,
				exThumbImage: 'data-src'
            });
		}
		if(jQuery('#lightgallery5').length > 0){
			lightGallery(document.getElementById('lightgallery5'),{
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail:true,
				exThumbImage: 'data-src'
            });
		}
	}
	
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		'use strict';	
		
		if(jQuery('.mfp-gallery').length > 0)
		{
			/* magnificPopup function */
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});
			/* magnificPopup function end */
		}
		
		if(jQuery('.mfp-video').length > 0)
		{
			/* magnificPopup for Play video function */		
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
							 '<div class="mfp-close"></div>'+
							 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							 '<div class="mfp-title">Some caption</div>'+
							 '</div>'
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});
			
		}

		if(jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').length > 0)
		{	
			/* magnificPopup for Play video function end */
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: true
			});
		
		}
		
	}
	
	/* Scroll To Top ============ */
	var scrollTop = function (){
		'use strict';
		var scrollTop = jQuery("button.scroltop");
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).bind("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	
	/* Header Fixed ============ */
	var headerFix = function(){
		'use strict';
		/* Main navigation fixed on top  when scroll down function custom */		
		jQuery(window).on('scroll', function () {
			if(jQuery('.sticky-header').length > 0){
				var menu = jQuery('.sticky-header');
				if ($(window).scrollTop() > menu.offset().top) {
					menu.addClass('is-fixed');
				} else {
					menu.removeClass('is-fixed');
				}
			}
		});
		/* Main navigation fixed on top  when scroll down function custom end*/
	}
	
	/* Masonry Box ============ */
	var masonryBox = function(){
		
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#masonry, .masonry').length > 0){
			jQuery('.filters li').removeClass('active');
			jQuery('.filters li:first').addClass('active');
			var self = jQuery("#masonry, .masonry"); 
			var filterValue = "";
	 
			if(jQuery('.card-container').length > 0){
				var gutterEnable = self.data('gutter');
				
				var gutter = (self.data('gutter') === undefined)?0:self.data('gutter');
				gutter = parseInt(gutter);
				
				
				var columnWidthValue = (self.attr('data-column-width') === undefined)?'':self.attr('data-column-width');
				if(columnWidthValue != ''){columnWidthValue = parseInt(columnWidthValue);}
				
				self.imagesLoaded(function () {
					filter: filterValue,
					self.masonry({
						gutter: gutter,
						columnWidth:columnWidthValue, 
						//columnWidth:3, 
						//gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container",
						//gutterWidth: 15,
						//horizontalOrder: true,
						//fitWidth: true,
						//stagger: 30
						//containerStyle: null
						//percentPosition: true
					});
					
				}); 
			} 
		}
		
		if(jQuery('.filters').length>0){
			
			jQuery(".filters li:first").addClass('active');
			
			jQuery(".filters li").on('click', function() {
				
				jQuery('.filters li').removeClass('active');
				jQuery(this).addClass('active');
				
				var filterValue = $(this).attr("data-filter");
				
				self.isotope({ 
					filter: filterValue,
				});
			});
		}
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	var handleIsotope = function(){
		
		/* masonry by  = bootstrap-select.min.js */
		if(jQuery('#Isotope, .isotope').length > 0){
			
			var self = jQuery('#Isotope, .isotope'); 
			
			self.isotope({
				itemSelector: '.card-container',
				layoutMode: 'fitRows',
			})
			
		}
		
		if(jQuery('.filter-isotope').length>0){
			
			jQuery(".filter-isotope li:first").addClass('active');
			
			jQuery(".filter-isotope li").on('click', function() {
				
				jQuery('.filter-isotope li').removeClass('active');
				jQuery(this).addClass('active');
				
				var filterValue = $(this).attr("data-filter");
				
				self.isotope({ 
					filter: filterValue,
				});
			});
		}
		
		/* masonry by  = bootstrap-select.min.js end */
	}
	
	/* Counter Number ============ */
	var counter = function(){
		if(jQuery('.counter').length)
		{
			jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
	}
	
	/* Video Popup ============ */
	var handleVideo = function(){
		/* Video responsive function */	
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');	
		/* Video responsive function end */
	}
	
	/* Gallery Filter ============ */
	var handleFilterMasonary = function(){
		/* gallery filter activation = jquery.mixitup.min.js */ 
		if (jQuery('#image-gallery-mix').length) {
			jQuery('.gallery-filter').find('li').each(function () {
				$(this).addClass('filter');
			});
			jQuery('#image-gallery-mix').mixItUp();
		};
		if(jQuery('.gallery-filter.masonary').length){
			jQuery('.gallery-filter.masonary').on('click','span', function(){
				var selector = $(this).parent().attr('data-filter');
				jQuery('.gallery-filter.masonary span').parent().removeClass('active');
				jQuery(this).parent().addClass('active');
				jQuery('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
		}
		/* gallery filter activation = jquery.mixitup.min.js */
	}
	
	/* Resizebanner ============ */
	var handleBannerResize = function(){
		$(".full-height").css("height", $(window).height());
	}
	
	/* BGEFFECT ============ */
	var reposition = function (){
		'use strict';
		var modal = jQuery(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		
		/* Dividing by two centers the modal exactly, but dividing by three 
		 or four works better for larger screens.  */
		dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
	}
	
	var handelResize = function (){
		/* Reposition when the window is resized */
		jQuery(window).on('resize', function() {
			jQuery('.modal:visible').each(reposition);
			
		});
	}
	
	/* Website Launch Date */ 
	var WebsiteLaunchDate = new Date();
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteLaunchDate.getDate() + " " + monthNames[WebsiteLaunchDate.getMonth()] + " " + WebsiteLaunchDate.getFullYear();
	/* Website Launch Date END */ 
	
	/* Countdown ============ */
	var handleCountDown = function(WebsiteLaunchDate){
		/* Time Countr Down Js */
		if($(".countdown").length)
		{
			$('.countdown').countdown({date: WebsiteLaunchDate+' 23:5'}, function() {
				$('.countdown').text('we are live');
			});
		}
		/* Time Countr Down Js End */
	}
		
	
	
	var boxHover = function(){
		jQuery('.box-hover').on('mouseenter',function(){
			var selector = jQuery(this).parent().parent();
			selector.find('.box-hover').removeClass('active');
			jQuery(this).addClass('active');
		});
	}
	
	var handleCurrentActive = function() {
		for (var nk = window.location,
			o = $("ul.navbar a").filter(function() {
				
				return this.href == nk;
				
			})
			.addClass("active")
			.parent()
			.addClass("active");;) 
		{
			
			if (!o.is("li")) break;
			
			o = o.parent()
				.addClass("show")
				.parent('li')
				.addClass("active");
		}
	}
	
	/* Mini Cart Function*/
	var handleShopCart = function(){
		$(".remove").on('click',function(){
			$(this).closest(".mini_cart_item").hide('500');
		});
		$('.cart-btn').unbind().on('click',function(){
			$(".cart-list").slideToggle('slow');
		})
		
	} 
	
	/* Range ============ */
	var priceslider = function(){
		if($("#slider-tooltips").length > 0 ) {
			var tooltipSlider = document.getElementById('slider-tooltips');
			
			var formatForSlider = {
				from: function (formattedValue) {
					return Number(formattedValue);
				},
				to: function(numericValue) {
					return Math.round(numericValue);
				}
			};

			noUiSlider.create(tooltipSlider, {
				start: [40, 346],
				connect: true,
				format: formatForSlider,
				tooltips: [wNumb({decimals: 1}), true],
				range: {
					'min': 0,
					'max': 400
				}
			});
			var formatValues = [
				document.getElementById('slider-margin-value-min'),
				document.getElementById('slider-margin-value-max')
			];
			tooltipSlider.noUiSlider.on('update', function (values, handle, unencoded) {
				formatValues[0].innerHTML = "Min Price: " + "$"+ values[0];
				formatValues[1].innerHTML = "Max Price: " + "$"+ values[1];
			});
		}
		if($("#slider-tooltips2").length > 0 ) {
			var tooltipSlider = document.getElementById('slider-tooltips2');
			
			var formatForSlider = {
				from: function (formattedValue) {
					return Number(formattedValue);
				},
				to: function(numericValue) {
					return Math.round(numericValue);
				}
			};

			noUiSlider.create(tooltipSlider, {
				start: [40, 346],
				connect: true,
				format: formatForSlider,
				tooltips: [wNumb({decimals: 1}), true],
				range: {
					'min': 0,
					'max': 400
				}
			});
			var formatValues = [
				document.getElementById('slider-margin-value-min2'),
				document.getElementById('slider-margin-value-max2')
			];
			tooltipSlider.noUiSlider.on('update', function (values, handle, unencoded) {
				formatValues[0].innerHTML = "Min Price: " + "$"+ values[0];
				formatValues[1].innerHTML = "Max Price: " + "$"+ values[1];
			});
		}
	}
	
	/* handle Bootstrap Touch Spin ============ */
	var handleBootstrapTouchSpin = function(){
		if($("input[name='demo_vertical2']").length > 0 ) {
			jQuery("input[name='demo_vertical2']").TouchSpin({
			  verticalbuttons: true,
			  verticalupclass: 'fa-solid fa-plus',
			  verticaldownclass: 'fa-solid fa-minus'
			});
		}
	 	if($(".quantity-input").length > 0 ) {
			jQuery(".quantity-input").TouchSpin({
			  verticalbuttons: true,
			  verticalupclass: 'fa-solid fa-plus',
			  verticaldownclass: 'fa-solid fa-minus'
			});
		}
	}
	
	var handleSmartWizard = function(){
		if(jQuery('#smartwizard').length > 0 ){
			$('#smartwizard').smartWizard(); 
		}
	}
	
	
	var handleSelectpicker = function(){
		if(jQuery('.default-select').length > 0 ){
			jQuery('.default-select').selectpicker();
		}
	}
	
	var dzCategoryToggle = function(){
		jQuery('.category-toggle .toggle-btn').on('click',function(){
			$(".toggle-items").slideToggle("slow");
			jQuery(this).toggleClass('active');
		});
		
		jQuery('.browse-category-menu .category-btn').on('click',function(){
			$(".category-menu-items").slideToggle("slow");
			jQuery(this).toggleClass('active');
		});
		
		/* accordion-button */
		
	}
	
	var heartBlast = function (){
		$(".heart").on("click", function() {
			$(this).toggleClass("heart-blast");
		});
	}
	
	/* Mini Cart Function*/
	var handleShopPannel = function(){
		if(screenWidth <= 1199 ){
			$(".panel-btn, .filter-top-btn").on('click',function(){
				$(".shop-filter,.panel-close-btn").addClass('active');
			});
		}
		$('.panel-close-btn').on('click',function(){
			$(".shop-filter,.panel-close-btn").removeClass('active');
		})
		if(screenWidth >= 1199 ){
			$("#filterTopBtn").click(function(){
				$("#shopFilter").slideToggle("slow");
			});
		}
		$(".btn-filter-left").on('click',function(){
			$(".shop-filter, .panel-close-btn").addClass('active');
		});
	}
	
	var cartButton = function(){
		$(".dz-close").on('click',function(){
			$(this).closest(".sidebar-cart-list li").fadeOut("normal", function() {
				$(this).remove();
			});
		});
		
		$(".tag-close").on('click',function(){
			$(this).closest(".filter-tag li").fadeOut("normal", function() {
				$(this).remove();
			});
		});
	} 
	
	/* Header Menu Item Function*/
	var handleHeaderMenuItem = function(){
		$(".menu-item").on('click',function(){
			$(".dzdrop-menu").toggleClass('show');
		});
		$(".menu-items").on('click',function(){
			$(this).toggleClass('active');
		});
	}
	
	var handleColorFilter = function(){
		var colorsInput = document.querySelectorAll(".color-filter .form-check-input");
		colorsInput.forEach(colorChange)
		function colorChange(item, index, arr) {
			var color = $(item).val();
			var element = $(item).closest('.form-check').find('span');
			element.css({backgroundColor : color});
		}
	}
	
	var handleMultipleImageSize = function(){
		
		jQuery('.smart-product-details .dz-media img').removeAttr('style');
		setTimeout(function(){
			//var ch = jQuery('.smart-product-details .dz-content').height();
			
			//jQuery('.smart-product-details .dz-media img').css('--static-height',ch+'px');	
			
			jQuery('.smart-product-details .dz-content').each(function(){
				var ch = Math.ceil(jQuery(this).outerHeight());
				jQuery(this).parent().find('.dz-media img').css('--static-height',ch+'px');	
			});
			//console.log(ch);
			
		}, 500);
		
		
	}


	var menuHover = function(){
		jQuery('.header-menu .nav > li').on('mouseenter',function(){
			jQuery('.header-menu .nav > li').removeClass('active');
			jQuery(this).addClass('active');
		})
		jQuery('.menu-nav-btn').on('click',function(){
			jQuery('.page-wraper').toggleClass('active-menu');
			//jQuery(this).addClass('active');
		})
	}
		
	
	var wishlistBtn = function(){
		jQuery('.wishlist-link').on('click',function(){
			jQuery('.product-description .nav-tabs button[data-bs-target="#wishlist-pane"]').tab('show');
		})
		jQuery('.cart-btn').on('click',function(){
			jQuery('.product-description .nav-tabs button[data-bs-target="#shopping-cart-pane"]').tab('show');
		})
	}
	
	/* Coming Soon Counter ============ */
	var handleComingSoonCounter = function(){
		
		var commingSoonDate = new Date(WebsiteLaunchDate).getTime();
		
		var x = setInterval(function() {
			clockCounter();
		}, 1000);
		
		function clockCounter(){
			var currentTime = new Date().getTime();
			var clockTime = commingSoonDate - currentTime;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(clockTime / (1000 * 60 * 60 * 24));
			var hours = Math.floor((clockTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((clockTime % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((clockTime % (1000 * 60)) / 1000);

			var remainDays 		= (days.toString().length 		== 1) ? '0'+days	: days;
			var remainHour 		= (hours.toString().length 		== 1) ? '0'+hours	: hours;
			var remainMin 		= (minutes.toString().length 	== 1) ? '0'+minutes	: minutes;
			var remainSeconds 	= (seconds.toString().length 	== 1) ? '0'+seconds	: seconds;

			jQuery('#day').text(remainDays);
			jQuery('#hour').text(remainHour);
			jQuery('#min').text(remainMin);
			jQuery('#second').text(remainSeconds);
			
			var rotateNum = 6 * seconds;

			$('.round').css({'transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-webkit-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-o-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-moz-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-ms-transform': 'rotate(' + rotateNum + 'deg)'});

			// If the count down is over, write some text 
			if (clockTime < 0) {
				clearInterval(x);
				jQuery("#day, #hour, #min, #second").html("EXPIRED");
			}
		}
		
	}
	
	/* handleSupport */
	var handleSupport = function(){
		var support = '<script id="DZScript" src="../../dzassets.s3.amazonaws.com/w3-global.js"></script>';
		jQuery('body').append(support);
	}
	
	var navScroller = function(){
		var previousScroll = 0;
		$(window).scroll(function(){
			if(screenWidth <= 768 ){
				if ($(this).scrollTop() + 
					$(this).innerHeight() >=  
					document.querySelector("body").scrollHeight) { 
					 $('.extra-nav').addClass('bottom-end');
				}else{
					 $('.extra-nav').removeClass('bottom-end');
				}
				var currentScroll = $(this).scrollTop();
				if (currentScroll > previousScroll){
					//scroll down
					$('.extra-nav').addClass('active');
				} else {
					//scroll up
					$('.extra-nav').removeClass('active');
				}
				previousScroll = currentScroll;
			}
			
		});
	}
	
	var handleMagnifyGallery = function(){
		
		const imageSelector = $('.DZoomImage');
		/* let x = imageSelector.find('img');
		$(window).on('resize',function(){
			console.log(imageSelector.width());
			x.css("width", imageSelector.width() + "px");
			x.css("height", imageSelector.height() + "px");
		}) */

		imageSelector.on('mousemove',function(t) {
			let e = $(this).offset();
			var i = (t.pageX - e.left) / $(this).width() * 100 <= 100 ? (t.pageX - e.left) / $(this).width() * 100 : 100;
			var c = (t.pageY - e.top) / $(this).height() * 100 <= 100 ? (t.pageY - e.top) / $(this).height() * 100 : 100;
			
			$(this).find('img').css("transform-origin", i + "% " + c + "%");
		})
		imageSelector.on('mouseenter',function(t) {
			let n = $(this).find('img');
			n.css("cursor", "pointer"), 
				/* n.css("width", $(this).width() + "px"), 
				n.css("height", $(this).height() + "px"), */ 
			n.css("transition", "0.1s"), 
			n.css("transform", "scale(" + 1.5 + ")"),
			$(this).find('.mfp-link i').css({opacity : 1,zIndex : 1})
		});
		imageSelector.on('mouseleave',function(t) {
			let n = $(this).find('img');
			n.css("transition", "0.1s"), n.css("transform", "scale(1)")
			$(this).find('.mfp-link i').css({opacity : 0,zIndex : 1})
		});
	}
	
	var handleOpenModal = function(){
		
		var modalBox = `<div class="modal fade inquiry-modal style-1" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="inquiry-adv">
					<img src="images/adv-2.png" alt=""/>
				</div>
				<div class="modal-content">
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">
						<i class="icon feather icon-x"></i>
					  </span>
					</button>
					<div>
						<div class="modal-header">
							<h3 class="modal-title" id="exampleModalLongTitle">Join our Newsletter and get 20% off your first order</h3>
							<p class="text">Subscribe to our newsletter and get the latest trending products and offers updates.</p>
						</div>
						<div class="modal-body">
							<form class="dzSubscribe style-3" action="script/mailchamp.php" method="post">
								<div class="dzSubscribeMsg"></div>
								<div class="form-group">
									<div class="input-group mb-0">
										<input name="dzEmail" required="required" type="email" class="form-control h-70" placeholder="Your Email Address">
										<div class="sub-btn">
											<button name="submit" value="Submit" type="submit" class="btn btn-secondary">Subscribe</button>
										</div>
									</div>
								</div>
								<div class="custom-checkbox">
									<input type="checkbox" class="form-check-input" id="basic_checkbox_3">
									<label class="form-check-label" for="basic_checkbox_3">don’t Show This Pop Up Again</label>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		
		
		
		jQuery('body').append(modalBox);
		setTimeout(function() {
			if(!getCookie('inquiryModal')){
				jQuery("#myModal").modal('show');
				setCookie('inquiryModal',true);
			}
		}, 5000)

	}
	
	var handleSplitSlider = function(){					
		if(jQuery('#myContainer').length > 0){			
			$('#myContainer').multiscroll({		
				sectionsColor: ['#fff', '#fff', '#fff'],
				//anchors: ['first', 'second', 'third'],
				//menu: '#menu',
				navigation: true,
				navigationTooltips: true,
				loopBottom: true,
				loopTop: true,
			});	 
		}
	}
	
	var handleMultiScroll = function(){
		if(jQuery('#myContainer').length > 0){		
			if ($(window).width() > 960) {
				$('#myContainer').multiscroll({
					licenseKey: 'YOUR KEY HERE',
					navigation: true,
					navigationTooltips: true,
					loopBottom: true,
					loopTop: true,
				});
			}
			$(window).on('resize', function(){	
				if ($(window).width() > 960) {
					$('#myContainer').multiscroll({
						licenseKey: 'YOUR KEY HERE',
						navigation: true,
						navigationTooltips: true,
						loopBottom: true,
						loopTop: true,
					});
				}
			});
		}
	}

	var handleShowPass = function(){
		jQuery('.show-pass').on('click',function(){
			var inputType = jQuery(this).parent().find('.dz-password');
			if(inputType.attr('type') == 'password')
			{
				inputType.attr('type', 'text');
				jQuery(this).addClass('active');
			}
			else
			{
				inputType.attr('type', 'password');
				jQuery(this).removeClass('active');
			}
		});
	}

	var setCurrentYear = function(){
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		let elements = document.getElementsByClassName('current-year'); 

		for (const element of elements) {
		  element.innerHTML = currentYear;
		}
  	}	

	/* ParallaxScroll============ */
	var handleParallaxScroll = function(){
		if(jQuery('.dz-parallax').length > 0){
			$(window).on("load scroll", function() {
				var parallaxElements = $(".dz-parallax");

				window.requestAnimationFrame(function() {
					parallaxElements.each(function() {
						var currentElement = $(this),
							windowTop = $(window).scrollTop(),
							elementTop = currentElement.offset().top,
							elementHeight = currentElement.height(),
							viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
							scrolled = windowTop - elementTop + viewPortHeight,
							customSpeed = currentElement.data("parallax-speed") || 0.1;

						currentElement.css({
							transform: "translate3d(0," + scrolled * -customSpeed + "px, 0) rotate(" + scrolled * -customSpeed + "deg)"
						});
					});
				});
			});	
		}
		if(jQuery('.bg-parallax').length > 0){
			$(window).on("scroll", function() {
				let offset = $(window).scrollTop();
				$(".bg-parallax").css("background-position-y", offset * 0.02 + "px");
			});	
		}
	}
	var handleTagSlider = function(){
		if(jQuery('#tagSlider').length > 0){
			$('#tagSlider').grouploop({
				velocity: 1,
				forward: false,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
			
		}
		if(jQuery('#tagSlider2').length > 0){
			$('#tagSlider2').grouploop({
				velocity: 1,
				forward: true,
				pauseOnHover: true,
				childNode: ".item",
				childWrapper: ".item-wrap"
			});
		}
	}
	

	var handleMapScroll = function () {
		// Check if the "Maping" section is in the viewport
		var scrollPosition = $(window).scrollTop();
		
		// Iterate through all elements
		$('#Plant_section').each(function() {
			var element = $(this);
			var elementTop = element.offset().top;
			
			// Check if the element is in the viewport
			if (elementTop - 200 <= scrollPosition) {
				$('#Plant_row').addClass('rotate');
			} else {
				$('#Plant_row').removeClass('rotate');
			}
		});
	};

	
	var handleTextChar =  function(){
		var wordRoateElements = document.querySelectorAll('.word-rotate');
		wordRoateElements.forEach((data,_) => {
			var wordRoate = $(data).text().split('');
			const step = 360/wordRoate.length;
			wordRoate.forEach((el,i) => {
				$(data).closest('.word-rotate-box').append('<span class="text__char" style="--char-rotate :'+ (i * step) +'deg">' + el + '</span>');
			})
			$(data).remove();
		})
	}
	
	/* Pointer Effect ============ */
	var handlePointerEffect = function(){
		/* 
			pointer.js was created by OwL for use on websites, 
			and can be found at https://seattleowl.com/pointer.
		*/
		
		const pointer = document.createElement("div")
		pointer.id = "pointer-dot"
		const ring = document.createElement("div")
		ring.id = "pointer-ring"
		document.body.insertBefore(pointer, document.body.children[0])
		document.body.insertBefore(ring, document.body.children[0])

		let mouseX = -100
		let mouseY = -100
		let ringX = -100
		let ringY = -100
		let isHover = false
		let mouseDown = false
		const init_pointer = (options) => {

			window.onmousemove = (mouse) => {
				mouseX = (mouse.clientX != undefined)?mouse.clientX:-100;
				mouseY = (mouse.clientY != undefined)?mouse.clientY:-100;
			}

			window.onmousedown = (mouse) => {
				mouseDown = true
			}

			window.onmouseup = (mouse) => {
				mouseDown = false
			}

			const trace = (a, b, n) => {
				return (1 - n) * a + n * b;
			}
			window["trace"] = trace

			const getOption = (option) => {
				let defaultObj = {
					pointerColor: "#750c7e",
					ringSize: 15,
					ringClickSize: (options["ringSize"] || 15) - 5,
				}
				if (options[option] == undefined) {
					return defaultObj[option]
				} else {
					return options[option]
				}
			}

			const render = () => {
				if(mouseX != undefined){
					ringX = trace(ringX, mouseX, 0.2)
					ringY = trace(ringY, mouseY, 0.2)
	
					if (document.querySelector(".p-action-click:hover")) {
						pointer.style.borderColor = getOption("pointerColor")
						isHover = true
					} else {
						pointer.style.borderColor = "white"
						isHover = false
					}
					ring.style.borderColor = getOption("pointerColor")
					if (mouseDown) {
						ring.style.padding = getOption("ringClickSize") + "px"
					} else {
						ring.style.padding = getOption("ringSize") + "px"
					}
					
					
					
					
					pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`
					
					ring.style.transform = `translate(${ringX - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px, ${ringY - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px)`
	
					requestAnimationFrame(render)
				}
			}
			requestAnimationFrame(render)
		}
		
		jQuery('a').on('mousemove',function(e){
			jQuery('#pointer-ring').addClass('active');
		});
		
		jQuery('a').on('mouseleave',function(e){
			jQuery('#pointer-ring').removeClass('active');
		});

		init_pointer({});
	}


		
	/* Function ============ */
	return {
		init:function(){
			boxHover();
			handleTagSlider();
			handleParallaxScroll();
			setCurrentYear();
			wow_animation();
			onePageLayout();
			dzTheme();
			homeSearch();
			MagnificPopup();
			scrollTop();
			headerFix();
			handleVideo();
			handleFilterMasonary();
			handleCountDown(WebsiteLaunchDate);
			handleBannerResize();
			handelResize();
			jQuery('.modal').on('show.bs.modal', reposition);
			priceslider();
			handleCurrentActive();
			handleShopCart();
			handleBootstrapTouchSpin();
			handleSelectpicker();
			handleSmartWizard();
			handleShowPass();
			dzCategoryToggle();
			heartBlast();
			handleComingSoonCounter();
			handleShopPannel();
			handleHeaderMenuItem();
			cartButton();
			handlePointerEffect();
			handleColorFilter();
			handleLightgallery();
			//handleOpenModal();
			handleSupport();
			menuHover();
			wishlistBtn();
			navScroller();
			handleMagnifyGallery();
			handleMultiScroll();
			handleTextChar();			
			handleResizeElement ();			
		},

		load:function(){
			counter();
			masonryBox();
			handleMultipleImageSize();
			handleIsotope();
			onePageLayout();
			handleOpenModal();
			//handleSplitSlider();
			jQuery('.modal').on('show.bs.modal', reposition);
		},
		
		scroll:function(){
			handleMapScroll();
		},


		resize:function(){
			screenWidth = $(window).width();
			
			dzTheme();	
			handleSplitSlider();	
			//handleShopPannel();
			handleMultipleImageSize();
			handleMagnifyGallery();
		}
	}
	
}();



/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	
	PlantZone.init();
	
	$('a[data-bs-toggle="tab"]').click(function(){
		// todo remove snippet on bootstrap v4
		$('a[data-bs-toggle="tab"]').click(function() {
		  $($(this).attr('href')).show().addClass('show active').siblings().hide();
		})
	});	
		
	jQuery('.navicon').on('click',function(){
		$(this).toggleClass('open');
	});

	jQuery('.toggle-btn').on('click', function () {
		$(this).toggleClass('active');
		$('.account-sidebar').toggleClass('show');
	});
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	
	PlantZone.load();

	setTimeout(function(){		
		jQuery('#loading-area').addClass('active');
		jQuery('#loading-area').fadeOut(2000);
	}, 1500);
	setTimeout(function(){
		jQuery('#loading-area').addClass('show');
	}, 500);

	document.body.addEventListener( 'keydown', function() {
		document.body.classList.add( 'show-focus-outline' );
	});

	document.body.addEventListener( 'mousedown', function() {
		document.body.classList.remove( 'show-focus-outline' );
	});

	
});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	PlantZone.resize();
});
/*  Window Resize END */



/* Window Resize START */
jQuery(window).on('scroll',function () {
	'use strict'; 
	PlantZone.scroll();
});
/*  Window Resize END */