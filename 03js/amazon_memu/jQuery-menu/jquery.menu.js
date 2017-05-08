/**
 * jQuery Menu plugin
 * 
 * @author lyz
 * @email 702368372#qq.com
 * @version 1.0
 * 
 * Licensed under the MIT License.
 */
(function ($, window, undefined) {
	var menu, panels, target, className, index, navOn, panelOn, me, i, reg;

	function Menu (config) {
		me = this;
		if (me == $) {
			return new Menu(config);
		}

		var DEFAULT = {
			menu: 'menu',
			nav: 'menu-nav',
			navs: 'menu-nav-item',
			panels: 'menu-panel-item',
			navHover: 'menu-nav-item-hover',
			navOn: 'menu-nav-item-on',
			panelOn: 'menu-panel-item-on',
			delay: 300,
			plugins: []
		}
		me.config = $.extend(DEFAULT, config, {});

		me.menu = $('.' + me.config.menu);
		me.nav = $('.' + me.config.nav);
		me.navs = $('.' + me.config.navs);
		me.panels = $('.' + me.config.panels);

		me.menu.mouseover (function (e) {
			target = e.target;
			className = target.className;
			target = $(target);
			index = target.index();
			reg = new RegExp(me.config.navs);

			if (reg.test(className)) {
				me.navSwitchTo(index);
				me.panelSwitchTo(index);
			}
		})

		for (i = 0; i < me.config.plugins.length; i++) {
			me.config.plugins[i].init(me);
		}
	}

	Menu.prototype.navAttemptSwitchTo = function (index) {
		me = this;
		me.navs.removeClass(me.config.navHover)
		       .eq(index).addClass(me.config.navHover);
	}

	Menu.prototype.navSwitchTo = function (index) {
		me = this;
		me.navs.removeClass(me.config.navOn + ' ' + me.config.navHover)
		       .eq(index).addClass(me.config.navOn);
	}

	Menu.prototype.panelSwitchTo = function (index) {
		me = this;
		clearTimeout(me.panelTimer);

		me.panels.removeClass(me.config.panelOn)
		         .eq(index).addClass(me.config.panelOn);
		me.navSwitchTo(index);
	};

	Menu.prototype.panelAttemptSwitchTo = function (index) {
		me = this;
		clearTimeout(me.panelTimer);

		me.panelTimer = setTimeout( function () {
			me.panelSwitchTo(index);
		}, me.config.delay)
		me.navAttemptSwitchTo(index);
	};
	
	$.Menu = Menu;

} (jQuery, this, undefined))