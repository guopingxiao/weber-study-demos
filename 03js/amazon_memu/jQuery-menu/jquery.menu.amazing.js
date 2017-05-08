/**
 * Plugin for jQuery-menu which acts similar to amazon's leftside nav
 * 
 * @author lyz
 * @email 702368372#qq.com
 * @version 1.0
 * 
 * Licensed under the MIT License.
 */
(function ($, window, undefined) {
	var start, end, slope, liveSlope, target, className, index, reg, ret, paths = [];

	function MenuAmazing () {
		me = this;
		if (me == $) {
			return new MenuAmazing();
		}
	}

	/**
	 * Init plugin
	 * @param  {object} host 
	 */
	MenuAmazing.prototype.init = function (host) {
		slope = host.nav.outerHeight() / host.nav.outerWidth();
		host.menu.unbind('mouseover'); 

		host.menu.mouseover( function (e) {
			target = e.target;
			className = target.className;
			target = $(target);
			index = target.index();
			reg = new RegExp(host.config.navs);
			if (reg.test(className)) {
				if (isSwitch()) {
					host.panelSwitchTo(index);
				} else {
					host.panelAttemptSwitchTo(index);
				}
			}
		});

		host.nav.mouseleave( function () {
			clearTimeout(host.panelTimer);
			host.navs.removeClass(host.config.navHover);
		})
	}

	/**
	 * Is swiching immediately or lazily
	 * @return {Boolean} yes or not
	 */
	function isSwitch () {
		start = paths[0] || {x: 0, y: 0};
		end = paths[paths.length-1] || {x: 0, y: 0};
		liveSlope = Math.abs(end.y - start.y) / Math.abs(end.x - start.x);
		inTriangle = end.x > start.x; // In the first quadrant or the forth quadrant

		if (!inTriangle && liveSlope > slope) {
			ret = true;
		} else {
			ret = false;
		}
		return ret;
	}

	/**
	 * Mark mouse path
	 */
	$(document).mousemove (function (e) {
		if (paths.length == 3) {
			paths.shift();
		}
		paths.push({x: e.pageX, y: e.pageY});
	})

	$.MenuAmazing = MenuAmazing;

} (jQuery, this, undefined))