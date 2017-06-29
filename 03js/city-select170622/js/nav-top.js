(function ($) {
    $.fn.cityselect = function (options) {
        $.fn.cityselect.defaults = {
            triggleEle: ".J-city",
            targetEle: ".J-city-list",
            activeClass: "city-active",
            hideClass: "Hide"
        };

        return this.each(function () {
            
            var opts = $.extend({}, $.fn.cityselect.defaults, options),
                container = $(this),
                triggleEle = opts.triggleEle;
                

            var trigger = container.find(opts.triggleEle),
                target = container.find(opts.targetEle);

            function show() {
                trigger.addClass(opts.activeClass);
                target.removeClass(opts.hideClass);

                var pos = trigger.offset(),
                topBorderWidth = parseInt(target.css('border-top-width'));
                target.css({
                    left: pos.left,
                    top: pos.top + trigger.outerHeight() - topBorderWidth
                });
            }

            function hide() {
                trigger.removeClass(opts.activeClass);
                target.addClass(opts.hideClass);
            }

            trigger.on("click", function (e) {
                if (!trigger.hasClass(opts.activeClass)) {
                    show();
                } else {
                    hide();
                }
                e.stopPropagation();
            });

            target.on("click", function (e) {
                e.stopPropagation();
            });

            target.on("mouseleave", function () {
                hide();
            });
        });

    };

})(jQuery);

