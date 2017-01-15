$(function(){
	$('.button-group .bnt').hover(function(){
		var title=$(this).attr('data-title');
		$('.tips em').text(title);
		var pos=$(this).offset().left - 245;
		var dis=($('.tips').outerWidth()-$(this).outerWidth())/2;
		var delta=pos-dis;
		$('.tips').css({'left':delta +'px'}).stop().animate({'top':160,'opacity':1},500);
	},function(){
			$('.tips').stop().animate({'top':100,'opacity':0},500);

	})
});
/*stop() 方法停止当前正在运行的动画。
$(selector).stop(stopAll,goToEnd)
stopAll	可选。规定是否停止被选元素的所有加入队列的动画。
goToEnd	
可选。规定是否允许完成当前的动画。
该参数只能在设置了 stopAll 参数时使用。
进入时：$(".tip").stop().animate({opacity:1,top:"自己的值"},300)
离开时：$(".tip").stop().animate({opacity:0,top:"自己的值"},300)

经测试，完美解决方案是：
进入时：$(".tip").stop(true,true).animate({opacity:1,top:"350px"},300)
离开时：$(".tip").stop().animate({opacity:0,top:"340px"},300)
*/