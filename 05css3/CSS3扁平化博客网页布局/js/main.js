;
$(function(){  
	var sideBar = $('#side-bar'),
		sideBarMenu = $('#side-bar-menu'),
		mask = $('.mask'),
		backTop = $('.back-top');


		sideBarMenu.on("click",showSideBar);
		mask.on('click', hideSideBar);
		backTop.on('click',backToTop);

		function showSideBar(){
			mask.fadeIn('slow');
			sideBar.animate({'right': 0},500);
			/*也可以结合css属性 

			sideBar.css('right', 0);
			在side-bar样式里添加
			transition:right 0.5s;

			*/
		}

		function hideSideBar(){
			mask.fadeOut('slow');
			sideBar.animate({'right': -sideBar.width()},500);
		}

		function backToTop(){
			$('html, body').animate({
				scrollTop:0 
			}, 500);
		}

		$(window).on('scroll', function(){
			if($(window).scrollTop() > $(window).height()){
				backTop.fadeIn();
			}else{
				backTop.fadeOut('fast');
			}
		})

		$(window).trigger('scroll');
   
}); 