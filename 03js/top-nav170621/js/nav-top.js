(function ($) {
    $.fn.slide = function (options) {
        $.fn.slide.defaults = {
            type: "menu",
            delayTime: 500,
            triggerTime: 150,
            defaultIndex: 0,
            topItem: "",
            downDrop: null,
            startFun: null,
            returnDefault: false,
            activeClass:"active"
        };

        return this.each(function () {
            var opts = $.extend({}, $.fn.slide.defaults, options),
                $this = $(this),
                index = parseInt(opts.defaultIndex),
                delayTime = parseInt(opts.delayTime),
                triggerTime = parseInt(opts.triggerTime);
                returnDefault = (opts.returnDefault == "false" || opts.returnDefault == false) ? false : true,
                topItem = $(opts.topItem, $this),//导航子元素集合
                effect = opts.effect,
                activeClass = opts.activeClass;
                mst =null, //trigger-setTimeout
                rtnST=null;

            var resetOn=function(){ 
                topItem.removeClass(activeClass); 
              }
            var doStartFun = function () { 
                if ($.isFunction(opts.startFun)) { 
                    opts.startFun(index, topItem) 
                } 
            }

            //单独处理菜单效果
            if (opts.type == "menu") {
                topItem.hover(
                    function () {
                        target = $(this).find(opts.downDrop); 
                        var hoverIndex = topItem.index($(this));

                        mst = setTimeout(function () {
                            index = hoverIndex;
                            topItem.removeClass(activeClass).eq(index).addClass(activeClass);
                            doStartFun();
                            target.stop(true, true).animate({ opacity: "show" }, delayTime); 
                        }, opts.triggerTime);

                    }, 
                    function () {
                        clearTimeout(mst);
                        target.animate({ opacity: "hide" }, delayTime);
                    }
                );

                if (returnDefault) {
                    $this.hover(
                        function () { 
                            clearTimeout(rtnST);
                         }, 
                         function () { 
                             rtnST = setTimeout(resetOn, delayTime);
                         });
                }
                return;
            }
        });

    };

})(jQuery);

