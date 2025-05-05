/**
	Template Name 	 : PlantZone
	Author			 : DexignZone
	Version			 : 1.1
	File Name	     : custom.js
	Author Portfolio : https://themeforest.net/user/dexignzone/portfolio
	
	Core script to handle the entire theme and core functions
**/

var PlantZoneCarousel = function(){
	
	// Main Swiper1====
	// Main Swiper
	var handleMainSwiper = function () {
		jQuery(document).ready(function($) {
			if ($('.main-swiper').length > 0) {
				// Main Swiper
				var mainSwiper = new Swiper(".main-swiper", {
					slidesPerView: 1,
					spaceBetween: 10,
					loop: true,
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
						renderBullet: function (index, className) {
							return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
						},
					},
					
				});
				// Thumbnail Swiper
				var thumbnailSwiper = new Swiper(".main-swiper-thumb", {
					slidesPerView: 1.4,
					spaceBetween: 100,
					loop: true,
					//speed: 1000,
					breakpoints: {
						300: { slidesPerView: 1, spaceBetween: 30,  },
						600: { slidesPerView: 1.2, spaceBetween: 30,  },
						767: { slidesPerView: 1.2, spaceBetween: 50,  },
						991: { slidesPerView: 1.2, spaceBetween: 50,  },
						1024: { slidesPerView: 1.2, spaceBetween: 50, },
						1200: { slidesPerView: 1.3, spaceBetween: 50, },
						1400: { slidesPerView: 1.2, spaceBetween: 100, },
						1680: { slidesPerView: 1.4, spaceBetween: 100,},
					},
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
				// Connect the two swipers
				mainSwiper.controller.control = thumbnailSwiper;
				thumbnailSwiper.controller.control = mainSwiper;
			}
		});
	}

	// Main Swiper2====
	var handleMainSwiper2 = function() {
		if(jQuery('.main-swiper2').length > 0){
			var swiper = new Swiper(".main-swiper-thumb", {
				loop: true,
				spaceBetween: 10,
				//slidesPerView: "auto",
				freeMode: true,
				watchSlidesProgress: true,
				autoplay: {
					delay: 1500,
				},
			});
			var swiper2 = new Swiper(".main-swiper", {
				loop: true,
				effect: "fade",
				speed: 1000,
				parallax: true,
				autoplay: {
					delay: 1500,
				},
				pagination: {
					el: ".swiper-pagination-five",
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
					},
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		}
	}



	
	// Galley-Thumb-Swiper ======
	var GalleyThumbSwiper = function () {
		if ($('.galley-thumb-swiper').length > 0 && $('.galley-swiper').length > 0) {
			var swiper = new Swiper(".galley-thumb-swiper", {
			loop: false,
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
			});
		
			var swiper2 = new Swiper(".galley-swiper", {
			loop: true,
			spaceBetween: 10,
			thumbs: {
				swiper: swiper,
			},
			});
		}
	};

	// kanbern Swiper ==
	var handlekanbernSwiper = function() {	
		if(jQuery('.kanbern-bnr').length > 0){
			var swiperTestimonial = new Swiper('.kanbern-bnr', {
				loop: true,
				spaceBetween: 10,
				slidesPerView: "auto",
				effect: "fade",
				parallax: true,
				speed: 1500,
				autoplay: {
				   delay: 2000,
				},
			});
		}
	}
	
	// Blog slideshow Swiper ==
	var BlogSlideshowSwiper = function() {	
		if(jQuery('.blog-slideshow').length > 0){
			var swiperTestimonial = new Swiper('.blog-slideshow', {
				loop: true,
				spaceBetween: 0,
				slidesPerView: "auto",
				speed: 1500,
				autoplay: {
				   delay: 2000,
				},
				pagination: {
				  el: ".swiper-pagination-two",
				  clickable: true,
				},
			});
		}
	}
	
	// Project Carousel Swiper ==
	var handleProjectCarousel = function() {	
		if(jQuery('.project-carousel').length > 0){
			var swiperBook = new Swiper('.project-carousel', {
				loop:true,
				centeredSlides: true,
				spaceBetween:30,
				slidesPerView: 1.5,
				autoplay: {
					delay: 4000,
				},
				navigation: {
					nextEl: ".portfolio-button-next",
					prevEl: ".portfolio-button-prev",
				},
				breakpoints: {
					300: {
						slidesPerView: 1,
					},
					600: {
						slidesPerView: 1,
					},
					767: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 1.5,
					},
					1600: {
						slidesPerView:1.5,
					},
				}
			});
		}	
	}
	
	// Swiper Four ==
	var handleSwiperFour = function() {	
		if(jQuery('.swiper-four').length > 0){
			var swiper = new Swiper( '.swiper-four', {
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 4,
				spaceBetween: 30,
				autoplay: {
					delay: 2500,
				},
				navigation: {
					nextEl: ".tranding-button-next",
					prevEl: ".tranding-button-prev",
				},	
				breakpoints: {
					1200: {
						slidesPerView: 4,
					},
					1024: {
						slidesPerView: 4,
					},
					991: {
						slidesPerView: 3,
					},
					591: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					340: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
				}
			});
		}
	}
		// Swiper Four ==
		var handleSwiperThree = function() {	
			if(jQuery('.swiper-three').length > 0){
				var swiper = new Swiper( '.swiper-three', {
					speed: 1000,
					loop: true,
					parallax: true,
					slidesPerView: 3,
					spaceBetween: 30,
					autoplay: {
						delay: 2500,
					},
					navigation: {
						nextEl: ".tranding-button-next",
						prevEl: ".tranding-button-prev",
					},	
					breakpoints: {
						1200: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 2,
						},
						991: {
							slidesPerView: 2,
						},
						591: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						340: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
					}
				});
			}
		}
	
	//  Swiper Five ==
	var handleSwiperFive = function() {	
		if(jQuery('.swiper-five').length > 0){
			var swiper = new Swiper( '.swiper-five', {
				slidesPerView: 1,
				spaceBetween: 20,
				speed:1000,
				loop: true,
				pagination: {
				  el: ".swiper-pagination-two",
				  clickable: true,
				},
				navigation: {
				  nextEl: ".about-button-next",
				  prevEl: ".about-button-prev",
				},
				breakpoints: {
					1600: {
						slidesPerView: 1,
					},
				}
			} );
		}
	}
	
	// Swiper Six ==
	var handleSwiperSix = function() {	
		if(jQuery('.swiper-six').length > 0){
			var swiper = new Swiper( '.swiper-six', {
				slidesPerView: 2,
				spaceBetween: 30,
				loop: true,
				autoplay: {
					delay: 2500,
				},
				breakpoints: {
					591: {
						slidesPerView: 2,
					},
					340: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
				}
			});
		}
	}

	//  Swiper Blog Post ==
	var handleSwiperBlogPost = function() {	
		if(jQuery('.swiper-blog-post').length > 0){
			var swiper = new Swiper( '.swiper-blog-post', {
				slidesPerView: 4.5,
				spaceBetween: 30,
				loop: true,
				speed: 1000,
				pagination: {
					el: ".swiper-pagination-trading",
				},
				
				breakpoints: {
					1600: {
						slidesPerView: 4.5,
					},
					1400: {
						slidesPerView: 3.5,
					},
					1024: {
						slidesPerView: 2.5,
					},
					991: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 1.5,
						spaceBetween: 15,
						centeredSlides: true,
					},
					575: {
						slidesPerView: 1.5,
						spaceBetween: 15,
						centeredSlides: true,
					},
					300: {
						slidesPerView: 1.2,
						spaceBetween: 15,
					},
					
				}
			});
		}
	}
		
	// Swiper Four ==
		var handleSwiperteam = function() {	
			if(jQuery('.swiper-team').length > 0){
				var swiper = new Swiper( '.swiper-team', {
					speed: 1000,
					loop: true,
					parallax: true,
					slidesPerView: 6,
					spaceBetween: 40,
					autoplay: {
						delay: 2500,
					},
					navigation: {
						nextEl: ".tranding-button-next",
						prevEl: ".tranding-button-prev",
					},	
					breakpoints: {
						1800: {
							slidesPerView: 6,
							spaceBetween: 30,
						},
						
						1200: {
							slidesPerView: 4.5,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 4,
						},
						991: {
							slidesPerView: 3,
						},
						591: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						340: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
					}
				});
			}
		}
	
	//  handle Category Swiper ==
	var handleCategorySwiper = function() {	
		if(jQuery('.category-swiper').length > 0){
			var swiper = new Swiper( '.category-swiper', {
				slidesPerView: 5,
				centeredSlides: false,
				spaceBetween: 20,
				loop: true,
					pagination: {
					el: ".swiper-pagination-two",
				},
				autoplay: {
					delay: 3000,
				},
				navigation: {
					nextEl: ".tranding-button-next", 
					prevEl: ".tranding-button-prev",
				},	
				breakpoints: {
					1600: {
						slidesPerView: 5,
					},
					1200: {
						slidesPerView: 5,
					},
					991: {
						slidesPerView: 4,
					},
					591: {
						slidesPerView: 3, 	
					},
					320: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
				}
			});
		}
	}
	
	//  handle Category Swiper2 ==
	var handleCategorySwiper2 = function() {	
		if(jQuery('.category-swiper2').length > 0){
			var swiper = new Swiper( '.category-swiper2', {
				slidesPerView: 5,
				spaceBetween: 30,
				parallax: true,
				loop: true,
				/* pagination: {
					el: ".swiper-pagination-two",
				}, */

				navigation: {
					nextEl: ".tranding-button-next", 
					prevEl: ".tranding-button-prev",
				},	
				breakpoints: {
					1600: {
						slidesPerView: 5,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 5,
						spaceBetween: 20,
					},
					991: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
					575: {
						slidesPerView: 3, 	
						spaceBetween: 15,
					},
					320: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
				}
			});
		}
	}
	
	//  Product Swiper ==
	var handleSwiperProduct = function() {	
		if(jQuery('.swiper-product').length > 0){
			var swiper = new Swiper( '.swiper-product', {
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 3,
				spaceBetween: 15,
				pagination: {
					el: ".swiper-pagination-trading",
				},
				breakpoints: {
					1400: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 1.5,
					},
					600: {
						slidesPerView: 1,
					},
					575: {
						slidesPerView: 1,
					},
					340: {
						slidesPerView: 1,
						centeredSlides: true,
					},
				}
			});
		}
	}

	//  Product Swiper ==
	var handleSwiperProduct2 = function() {	
		if(jQuery('.swiper-product2').length > 0){
			var swiper = new Swiper( '.swiper-product2', {
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 3,
				spaceBetween: 30,
				pagination: {
					el: ".swiper-pagination-trading",
				},
				autoplay: {
					delay: 2500,
				},
				breakpoints: {
					1400: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 2,
					},
					767: {
						slidesPerView: 1.5,
					},
					600: {
						slidesPerView: 1,
					},
					575: {
						slidesPerView: 1,
					},
					340: {
						slidesPerView: 1,
						centeredSlides: true,
					},
				}
			});
		}
	}
	
	//  shop Swiper ==
	var handleSwiperShop = function() {	
		if(jQuery('.swiper-shop').length > 0){
			var swiper = new Swiper( '.swiper-shop', {
				slidesPerView: 5,
				spaceBetween: 15,
				loop: true,
				pagination: {
					el: ".swiper-pagination-trading",
				},
				
				navigation: {
					nextEl: ".shop-button-next",
					prevEl: ".shop-button-prev",
				},
				breakpoints: {
					1600: {
						slidesPerView: 5,
					},
					1400: {
						slidesPerView: 4,
					},
					991: {
						slidesPerView: 3,
					},
					767: {
						slidesPerView: 3,
					},
					575: {
						slidesPerView: 2,
					},
					340: {
						slidesPerView: 2,
					},
				}
			});
		}
	}

	// Swiper Four ==
	var handleSwiperShop2 = function() {	
		if(jQuery('.swiper-shop2').length > 0){
			var swiper = new Swiper( '.swiper-shop2', {
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 4,
				spaceBetween: 30,
				autoplay: {
					delay: 2500,
				},
				pagination: {
					el: ".swiper-pagination-trading",
				},
				
				navigation: {
					nextEl: ".shop-button-next",
					prevEl: ".shop-button-prev",
				},	
				breakpoints: {
					1600: {
						slidesPerView: 4,
					},
					1440: {
						slidesPerView: 3,
					},
					1300: {
						slidesPerView: 5,
					},
					991: {
						slidesPerView: 4,
					},
					767: {
						slidesPerView: 2,
					},
					575: {
						slidesPerView: 2,
					},
					340: {
						slidesPerView: 1,
						centeredSlides: true,
					},
				}
			});
		}
	}
	
	
	//  company Swiper ==
	var handleSwiperCompany = function() {	
		if(jQuery('.swiper-company').length > 0){
			var swiper = new Swiper( '.swiper-company', {
				slidesPerView: 6,
				spaceBetween: 30,
				loop: true,
				pagination: {
					el: ".swiper-pagination-trading",
				},
				breakpoints: {
					1200: {
						slidesPerView: 6,
					},
					991: {
						slidesPerView: 5,
					},
					767: {
						slidesPerView: 4,
					},
					575: {
						slidesPerView: 2,
					},
					340: {
						slidesPerView: 2,
					},
				}
			});
		}
	}

	var ProductGallerySwiper1 = function() {	
		if(jQuery('.product-gallery-swiper').length > 0){
			var swiper = new Swiper(".product-gallery-swiper", {
				spaceBetween: 30,
				loop: true,
				slidesPerView: 2,
			});
			var swiperSlider = new Swiper(".product-gallery-swiper2", {
				spaceBetween: 0,
				loop: true,
				updateOnWindowResize: true,
				navigation: {
					nextEl: ".gallery-button-next",
					prevEl: ".gallery-button-prev",
				},
				thumbs: {
					swiper: swiper,
				},
				pagination: {
					el: ".swiper-pagination-slider1",
					type: "progressbar",
				},
			});
			if($('.image-slider__pagination').length > 0){
				function mainSliderPagination(){
					var swipertotalSlide = $('.product-gallery-swiper .swiper-slide').length;			
					var fragment = document.querySelector('.image-slider__current');
					var fragment2 = document.querySelector('.image-slider__total');
					var current = swiperSlider.realIndex + 1;
					if (current > swipertotalSlide)
					current = 1;
					var idx = current < 10 ? ("0" + current) : current;
					var tdx = swipertotalSlide < 10 ? ("0" + swipertotalSlide) : swipertotalSlide;
					fragment2.innerHTML = (tdx);
					fragment.innerHTML = (idx);
				}
				mainSliderPagination();
				swiperSlider.on('slideChange', function() {
					mainSliderPagination();
				});
			}
		}
	}
	
	//  Quick View Modal Swiper ==
	var handleQuickModal = function() {	
		if(jQuery('.quick-modal-swiper').length > 0){
			var swiper = new Swiper(".quick-modal-swiper", {
			  spaceBetween: 15,
			  slidesPerView: 4,
			  freeMode: true,
			  watchSlidesProgress: true,
			});
			var swiper2 = new Swiper(".quick-modal-swiper2", {
			  spaceBetween: 0,
			  updateOnWindowResize: true,	
			  navigation: {
				nextEl: ".gallery-button-next",
				prevEl: ".gallery-button-prev",
			  },
			  thumbs: {
				swiper: swiper,
			  },
			});
		}
	}
	
	//  Product Gallery Swiper ==
	var handleProductGallery = function() {	
		if(jQuery('.product-gallery').length > 0){
			var swiper = new Swiper(".product-thumb", {
				slidesPerView: "2",
				spaceBetween: 0,
				
				grid: {
					rows: 2,
				},
				pagination: {
					el: ".product-swiper-pagination",
					clickable: true,
					renderBullet: function (index, className) {
					  return '<span class="' + className + '">0' + (index + 1) + "</span>";
					},
				},
				breakpoints: {
					
					576: {
						slidesPerView: 2,
					},
					300: {
						slidesPerView: 1,
					},
				}
			});
			var swiper2 = new Swiper(".product-gallery", {
				slidesPerView: "1",
				
				thumbs: {
				  swiper: swiper,
				},
			});
		}
	}
	
	//  Portfolio Gallery Swiper1 ==
	var handlePortfolioGallery = function() {	
		if(jQuery('.portfolio-gallery').length > 0){
			var swiper = new Swiper(".portfolio-thumb", {
				slidesPerView: "auto",
				spaceBetween: 0,
				
			});
			var swiper2 = new Swiper(".portfolio-gallery", {
				slidesPerView: "1",
				
				thumbs: {
				  swiper: swiper,
				},
			});
		}
	}
	
	//  Portfolio Gallery Swiper2 ==
	var handlePortfolioGallery2 = function() {	
		if(jQuery('.portfolio-gallery2').length > 0){
			var swiper = new Swiper( '.portfolio-gallery2', {
				slidesPerView: "auto",
				spaceBetween: 30,
				
				loop: true,
				autoplay: {
					delay: 2500,
				},
				pagination: {
					el: ".swiper-pagination-two",
				},
				navigation: {
					nextEl: ".portfolio-button-next",
					prevEl: ".portfolio-button-prev",
				},
				breakpoints: {
					1200: {
						slidesPerView: "auto",
					},
					576: {
						slidesPerView: "auto",
					},
					300: {
						slidesPerView: 1,
					},
				}
			} ); 
		}
	}
	
	//  Portfolio Gallery Swiper3 ==
	var handlePortfolioGallery3 = function() {	
		if(jQuery('.portfolio-gallery3').length > 0){
			var swiper = new Swiper( '.portfolio-gallery3', {
				slidesPerView: 3,
				spaceBetween: 30,
				loop: true,
				autoplay: {
					delay: 2500,
				},
				pagination: {
					el: ".swiper-pagination-two",
				},
				navigation: {
					nextEl: ".portfolio-button-next",
					prevEl: ".portfolio-button-prev",
				},
				breakpoints: {
					1200: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 2,
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					300: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
				}
			} ); 
		}
	}
	
	//  Portfolio Detail Swiper ==
	var handlePortfolioDetail3 = function() {	
		if(jQuery('.portfolio-detail3').length > 0){
			var swiper = new Swiper( '.portfolio-detail3', {
				slidesPerView: 4,
				spaceBetween: 30,
				loop: true,
				autoplay: {
					delay: 2500,
				},
				breakpoints: {
					1200: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 3,
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					300: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
				}
			} ); 
		}
	}
	
	// Split Swiper ==
	var handleSplitSwiper = function() {	
		if(jQuery('.spilt-swiper-slider').length > 0){
			var spiltSwiper = new Swiper('.spilt-swiper-slider', {
				direction: "vertical",
				loop: true,
				slidesPerView: 1,
				mousewheel: true,
				paginationClickable: true,
				pagination: {
					el: ".swiper-pagination-two",
				},
				grabCursor: true,
				speed: 1000,
				parallax: true,
				effect: "slide",
				mousewheelControl: 1,
			});
		}
	}


	

	// Split Swiper ==
	var handleCollectionsSwiper = function() {	
		var swiper = new Swiper('.testimonial-swiper', {
			speed: 1500,
			parallax: true,
			slidesPerView: 3,
			spaceBetween: 30,
			loop:true,
			autoplay: {
			   delay: 3000,
			},
			
			breakpoints: {
				1600: {
				slidesPerView: 3,
				},
				1200: {
				slidesPerView: 3,
				},
				1024: {
				slidesPerView: 2,
				},
				991: {
				slidesPerView: 2,
				},
				767: {
				slidesPerView: 2,
				},
				575: {
				slidesPerView: 2,
				},
				360: {
				slidesPerView: 1,
				},
			},
			navigation: {
	          	nextEl: ".testimonial-button-next",
	         	 prevEl: ".testimonial-button-prev",
	        },
			pagination: {
	         	 el: ".swiper-pagination",
	         	 clickable: true,
	         	 renderBullet: function (index, className) {
	           	 return '<span class="' + className + '">' +"0"+ (index + 1) + "</span>";
	          	},
	        },
		});
	}
	

	// StorySwiper
	var StorySwiper = function () {
		if (jQuery('.status-swiper').length > 0) {
			var Statusswiper = new Swiper('.status-swiper', {
				loop: true,
				spaceBetween: 0,
				slidesPerView: "auto",
				speed: 1500,
				effect: "fade",
				autoplay: {
					delay: 2000,
				},
				pagination: {
					el: ".status-pagination",
					clickable: true,
				},
			});

			jQuery('.post-status-btn').on('click', function () {
				Statusswiper.slideTo(0); 
				Statusswiper.autoplay.start(); 
			});
		}
	};


	
	/* Function ============ */
	return {
	
		init:function(){
		},

		load:function(){
			handleMainSwiper();
			handleCollectionsSwiper();
			handleSwiperteam();
			handleMainSwiper2();
			handlekanbernSwiper();
			BlogSlideshowSwiper();
			handleProjectCarousel();
			handleSwiperFour();
			handleSwiperFive();
			handleSwiperSix();
			handleSwiperBlogPost();
			handleCategorySwiper();
			handleCategorySwiper2();
			handleSwiperProduct();
			handleSwiperProduct2();
			handleSwiperThree();
			handleSwiperCompany();
			ProductGallerySwiper1();
			handleProductGallery();
			handlePortfolioGallery();
			handlePortfolioGallery2();
			handlePortfolioGallery3();
			handlePortfolioDetail3();
			handleSplitSwiper();
			handleQuickModal();
			handleSwiperShop();
			handleSwiperShop2()
			GalleyThumbSwiper();
			StorySwiper();
		},
		
		resize:function(){
			ProductGallerySwiper1();
			//handleMainSwiper();
		}
	}
	
}();


/* Document.ready Start */	
jQuery(document).ready(function() {
    'use strict';
	
	PlantZoneCarousel.init();
	
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	PlantZoneCarousel.load();

	
});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	PlantZoneCarousel.resize();
});
/*  Window Resize END */