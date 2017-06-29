
var index = 0;
$(function(){
    var navTop = $(".nav-top");
    var init = $(".nav-top .top-item").eq(index);
    var block = $(".nav-top .block");
    block.css({
        "left": init.position().left
    });
    navTop.hover(function() {},
    function() {
        block.stop().animate({
            "left": init.position().left
        },
        300);
    });
    navTop.slide({
        type: "menu",
        delayTime: 300,
        triggerTime: 0,
        defaultIndex: index,
        topItem: ".top-item",
        downDrop: ".sub-ul",
        returnDefault: false,
        startFun: function(index, items) {
            block.stop().animate({
                "left": items.eq(index).position().left
            },
            300);
        }
    });
});


$(function(){
    var navTop = $(".city-nav");

    navTop.slide({
        type: "menu",
        delayTime: 300,
        triggerTime: 0,
        topItem: ".city-item",
        downDrop: ".sub-ul",
        returnDefault: true
    });
});



