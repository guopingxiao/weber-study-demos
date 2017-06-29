'use strict';

var $ = require('jquery');
var suggest = require('suggest');
// var Ajax = require('request').Ajax;
var Placeholder = require('placeholder');
var Storage = require('storage');

if (Storage._init && !Storage.driver) {
    Storage._init();
}

function parseQuery(qs) {
    var ret = {};
    qs.split("&").forEach(function (pair) {
        var splited = pair.split("=");
        ret[splited[0]] = splited[1];
    });
    return ret;
}

function toQueryString(query) {
    var ret = [];
    for (var key in query) {
        ret.push(key + "=" + query[key]);
    }
    return ret.join("&");
}

function replaceIndex(template, data) {
    return template.replace(/\{(\d+)\}/g, function (a, index) {
        return data[index] || "";
    });
}

function lastRun(fn, time) {
    var handler = null;
    time = time || 100;
    return function () {
        if (handler) {
            clearTimeout(handler);
        }
        var self = this,
            argus = arguments;
        handler = setTimeout(function () {
            fn.apply(self, argus);
            handler = null;
        }, time);
    };
}

function extend(target, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            target[key] = src[key];
        }
    }
}

var transXSS = function (str) {
    return str ? str.replace(/[<>&"]/g, function (target) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;"
        }[target];
    }) : str;
}

// 最近搜索记录
var recentSearch = {
    storeKey: "header-search-logs",
    get: function () {
        var items = transXSS(Storage.getItem(this.storeKey));

        items = items && items.split(",").slice(-5); //最近搜索条目

        return items ? [{render_type: "fuck-title", text: "最近搜索"}]
            .concat(items.map(function (text) {
                return {render_type: "log", text: text}
            }).reverse()) : [];
    },
    add: function (text) {
        var items = transXSS(Storage.getItem(this.storeKey));

        items = items ? items.split(",") : [];
        if (items.indexOf(text) === -1 && text) {
            items.push(text);
        }

        Storage.setItem(this.storeKey, items.join(","));
    },
    remove: function (text) {
        var items = transXSS(Storage.getItem(this.storeKey)).split(",");
        var index = items.indexOf(text);

        if (index >= 0) {
            items.splice(index, 1);
            Storage.setItem(this.storeKey, items.join(","));
        }
    }
};

function init(config) {
    var container = config.container,
        searchInput = container.find(".J-search-input"),
        searchBtn = container.find(".J-search-btn"),
        cityId = searchInput.attr('data-s-cityid'),
        category = searchInput.attr('data-s-cateid'),
        channelId = searchInput.attr('data-s-chanid'),
        autoCompletePattern = searchInput.attr('data-s-apattern') || '/ajax/json/suggest/search?do=hsc&c={0}&s={1}';

    var searchPicker,
        placeholder = Placeholder(searchInput),
        fetchCache = {};

    var baseSearch = (function () {

        function Get(id) {
            return DOC.getElementById(id);
        }

        function Trim(s) {
            return s.replace(/^\s+|\s+$/g, EMPTY);
        }

        function click() {
            old_onclick();

            var E = encodeURIComponent,
                value = Trim(getValue().replace(VALUE_SANTITIZER, ' ')).replace(/\//g, " "),
                search_base = formatData(SEARCH_PATTERN),
                search_base_for_empty_value = formatData(SEARCH_PATTERN_FOR_EMPTY),
                redirect_address = search_base.indexOf("{q}") !== -1 ? search_base.replace("{q}", E(value)) : (search_base + E(value));

            var keywordList = {
                55: {
                    "\u5f69\u5986\u9020\u578b": 166
                },
                70: {
                    "\u4eb2\u5b50\u6444\u5f71": 193,
                    "\u5e7c\u513f\u6559\u80b2": 188,
                    "\u5b55\u5987\u5199\u771f": 27814,
                    "\u5b55\u4ea7\u62a4\u7406": 258,
                    "\u4eb2\u5b50\u8d2d\u7269": 125,
                    "\u4eb2\u5b50\u6e38\u4e50": 161,
                    "\u513f\u7ae5\u6444\u5f71": 27813,
                    "\u5168\u5bb6\u798f": 2782,
                    "\u65e9\u6559\u4e2d\u5fc3": 27761,
                    "\u5e7c\u513f\u5916\u8bed": 27762,
                    "\u5e7c\u513f\u624d\u827a": 27763,
                    "\u4eb2\u5b50\u4e50\u56ed": 27760,
                    "\u5a74\u513f\u6e38\u6cf3": 27767,
                    "\u5987\u5e7c\u533b\u9662": 257,
                    "\u6708\u5b50\u670d\u52a1": 27766,
                    "\u4ea7\u540e\u6062\u590d": 27768
                }
            };

            if (value || search_base_for_empty_value) {
                var curCityId = search_box.getAttribute("data-s-cityid"),
                    cityListForTravel = [1, 2, 3, 11, 5, 6, 13, 21, 22, 10, 160, 18, 19, 79, 4, 7, 8, 9, 17, 14, 15, 16, 110, 344, 94, 98, 104, 105, 101, 145, 148, 149, 219, 92, 99, 108, 150, 152, 155, 213, 385, 35, 93, 208, 24, 102, 416, 12, 70, 258, 267, 151, 62, 26, 23, 146, 27, 162, 206, 220, 345, 147, 59, 80, 44, 299, 180, 179, 196, 194, 111, 46, 167, 103, 209, 224, 25, 71, 97, 58, 106, 107, 95, 42, 184, 260, 313, 225, 226, 47, 33, 134, 242, 217, 210, 119, 137, 153, 120, 143, 112, 161, 192, 1009, 292, 197, 218, 113, 321, 211, 116, 133, 96, 325, 129, 207, 127, 29, 166, 163, 84, 241, 115, 109, 277, 130, 200, 114, 157, 132];
                if ("\u65c5\u6e38\u5a5a\u7eb1" == value) {
                    -1 != cityListForTravel.indexOf(parseInt(curCityId)) && (WIN.location.href = "/wedding/travel/" + curCityId);
                    return;
                }


                if (curCityId === "1") {
                    keywordList = {
                        55: {
                            "\u5a5a\u5bb4": 165,
                            "\u5a5a\u5bb4\u9152\u5e97": 165,
                            "\u5a5a\u793c\u4f1a\u6240": 2738,
                            "\u5a5a\u7eb1\u6444\u5f71": 163,
                            "\u5a5a\u7eb1\u793c\u670d": 162,
                            "\u5a5a\u5e86\u516c\u53f8": 167,
                            "\u5a5a\u6212\u9996\u9970": 191,
                            "\u5f69\u5986\u9020\u578b": 166
                        },
                        70: {
                            "\u6708\u5b50\u4f1a\u6240": 2784,
                            "\u6708\u5ac2": 2786,
                            "\u6708\u5b50\u9910": 2788,
                            "\u4eb2\u5b50\u6444\u5f71": 193,
                            "\u5e7c\u513f\u6559\u80b2": 188,
                            "\u5b55\u5987\u5199\u771f": 27814,
                            "\u5b55\u4ea7\u62a4\u7406": 258,
                            "\u4eb2\u5b50\u8d2d\u7269": 125,
                            "\u4eb2\u5b50\u6e38\u4e50": 161,
                            "\u513f\u7ae5\u6444\u5f71": 27813,
                            "\u5168\u5bb6\u798f": 2782,
                            "\u65e9\u6559\u4e2d\u5fc3": 27761,
                            "\u5e7c\u513f\u5916\u8bed": 27762,
                            "\u5e7c\u513f\u624d\u827a": 27763,
                            "\u4eb2\u5b50\u4e50\u56ed": 27760,
                            "\u5a74\u513f\u6e38\u6cf3": 27767,
                            "\u5987\u5e7c\u533b\u9662": 257,
                            "\u6708\u5b50\u670d\u52a1": 27766,
                            "\u4ea7\u540e\u6062\u590d": 27768
                        }
                    }
                } else if (curCityId === "2") {
                    keywordList = {
                        55: {
                            "\u5a5a\u5bb4": 165,
                            "\u5a5a\u7eb1\u6444\u5f71": 163,
                            "\u5a5a\u7eb1\u793c\u670d": 162,
                            "\u5a5a\u5e86\u516c\u53f8": 167,
                            "\u5a5a\u6212\u9996\u9970": 191,
                            "\u5f69\u5986\u9020\u578b": 166
                        },
                        70: {
                            "\u6708\u5b50\u4f1a\u6240": 2784,
                            "\u6708\u5ac2": 2786,
                            "\u6708\u5b50\u9910": 2788,
                            "\u4eb2\u5b50\u6444\u5f71": 193,
                            "\u5e7c\u513f\u6559\u80b2": 188,
                            "\u5b55\u5987\u5199\u771f": 27814,
                            "\u5b55\u4ea7\u62a4\u7406": 258,
                            "\u4eb2\u5b50\u8d2d\u7269": 125,
                            "\u4eb2\u5b50\u6e38\u4e50": 161,
                            "\u513f\u7ae5\u6444\u5f71": 27813,
                            "\u5168\u5bb6\u798f": 2782,
                            "\u65e9\u6559\u4e2d\u5fc3": 27761,
                            "\u5e7c\u513f\u5916\u8bed": 27762,
                            "\u5e7c\u513f\u624d\u827a": 27763,
                            "\u4eb2\u5b50\u4e50\u56ed": 27760,
                            "\u5a74\u513f\u6e38\u6cf3": 27767,
                            "\u5987\u5e7c\u533b\u9662": 257,
                            "\u6708\u5b50\u670d\u52a1": 27766,
                            "\u4ea7\u540e\u6062\u590d": 27768
                        }
                    }
                }

                for (var l in keywordList) {
                    for (var h in keywordList[l]) {
                        if (value == h && "" != value) {
                            window.location.href = "/search/category/" + curCityId + "/" + l + "/g" + keywordList[l][h];
                            return;
                        }
                    }
                }


                if (["可送外卖", "外卖", "附近外卖", "外送", "外卖网"].indexOf(value) !== -1 && search_box.getAttribute("data-s-cityid") === "1") {
                    WIN.location.href = "http://waimai.dianping.com";
                    return;
                } else {
                    WIN.location.href = value ? redirect_address : search_base_for_empty_value;
                }

            } else {
                search_box.focus();
            }

            return false;
        }

        function getValue() {
            return search_box.value;
        }

        function getSearchPattern(attr) {
            return search_box.getAttribute(attr);
        }

        function formatData(pattern) {
            var data = PATTERN_DATA,
                offset = data.length;

            while (offset--) {
                pattern = pattern.replace('{' + offset + '}', data[offset]);
            }

            return pattern;
        }

        function triggerClick(element) {
            var event; // The custom event that will be created
            if (document.createEvent) {
                event = document.createEvent("HTMLEvents");
                event.initEvent("click", true, true);
            } else {
                event = document.createEventObject();
                event.eventType = "click";
            }

            event.eventName = "click";

            if (document.createEvent) {
                element.dispatchEvent(event);
            } else {
                element.fireEvent("on" + event.eventType, event);
            }
        }

        var PATTERN_DATA = arguments,

            WIN = window,
            DOC = WIN.document,
            EMPTY = '',

        // santitize user input
            VALUE_SANTITIZER = /[\\<]+/g, /* fix visual studio highlight bug */

            search_box = Get("page-header").getElementsByTagName("input")[0],
            search_btn = search_box.parentNode.getElementsByTagName("a")[0],

            SEARCH_PATTERN = getSearchPattern('data-s-pattern'),
            SEARCH_PATTERN_FOR_EMPTY = getSearchPattern('data-s-epattern'),

            old_onclick = search_btn.onclick || function () {
                };

        search_box.onkeydown = function (e) {
            e = e || WIN.event;
            if (e.keyCode === 13) {
                triggerClick(search_btn);
                return false
            }
        };

        search_btn.onclick = click;

        return {
            s: VALUE_SANTITIZER,

            // set the new data of cityID and categoryID
            data: function () {
                PATTERN_DATA = arguments;
            },

            // the setter of value getter
            val: function (valueGetter) {
                getValue = valueGetter;
            },

            submit: click
        }

    })(cityId, 0);

    /**
     * 15  : promo
     * 5   : info
     * 150 : group
     */
    if (baseSearch && container.length && !/^(5|150|200)$/.test(channelId)) {

        // 设置城市
        //baseSearch.data(cityId, 0);

        baseSearch.val(function () {
            return placeholder.getValue().trim();
        });

        baseSearch.submit = (function (old_submit) {
            return function () {
                recentSearch.add(placeholder.getValue().trim());
                old_submit();
            };
        })(baseSearch.submit);

        searchInput[0].onkeydown = (function (old_key_down) {
            return function (e) {
                e = e || window.event;

                var currentItem;

                if (e.keyCode === 13) {
                    if (searchPicker.items && (currentItem = searchPicker.items[searchPicker.selectedIndex])) {
                        currentItem = $(currentItem);
                        searchPicker.emit("select", {
                            data: currentItem.data('data'),
                            index: currentItem.data('index'),
                            keyword: currentItem.data('keyword'),
                            element: currentItem
                        });
                    } else {
                        recentSearch.add(placeholder.getValue().trim());
                        old_key_down(e);
                    }
                }
            };
        })(searchInput[0].onkeydown || function () {
            });

        searchPicker = suggest(searchInput, {
            itemActiveClass: 'active',
            itemSelector: "a.suggest-item",
            panelContainer: container,
            panel: $('<div>').addClass("search-suggest Hide"),
            itemRenderer: function (item) {
                var render_presets = {
                    // 分组标题
                    "title": function (item) {
                        return '<span class="suggest-item ac-type-title"><span class="keyword">' + item.text + '</span></span>';
                    },
                    // 分组标题
                    "fuck-title": function (item) {
                        return '<span class="suggest-item ac-type-title fuck-title"><span class="keyword">' + item.text + '</span></span>';
                    },
                    // 分割线
                    "spliter": function (item) {
                        return '<span class="suggest-item ac-type-spliter"></span>';
                    },
                    // 搜索记录
                    "log": function (item) {
                        return '<a class="suggest-item ac-type-log"><span class="keyword">' + item.text + '</span>'
                            + '<span class="remove">删除</span></a>';
                    },
                    // 普通条目
                    "text": function (item) {
                        var item = item.content;
                        var splited = item.split('|')
                            , text = splited[0]
                            , count = splited[2]
                            , input = new RegExp("^(" + placeholder.getValue().trim() + ")", "i");

                        return '<a class="suggest-item"><span class="keyword">' + text.replace(input, '<em>$1</em>') + '</span>'
                            + '<span class="count">' + count + '</span></a>';
                    },
                    // 其余选项
                    "extra": function (item) {
                        var item = item.content;
                        if (!item) {
                            return;
                        }
                        var input = new RegExp("^(" + placeholder.getValue().trim() + ")", "i");
                        return '<a class="suggest-item ac-' + item.type + '"><span class="keyword">' + item.text.replace(input, '<em>$1</em>') + '</span></a>';
                    }
                }

                if (typeof item.content === "string") {
                    return $(render_presets.text(item));
                } else {
                    item.render_type = item.render_type || "extra";
                    return $(render_presets[item.render_type](item));
                }
            }
        }).on("select", function (item) {
            var data = item.data;

            if (typeof data.content === "string") {
                searchInput.val(data.content.split("|")[0]);
                baseSearch.submit();
            } else {
                if (data.content) {
                    if (/^http:\/\//.test(data.content.url)) {
                        //window.open(data.url);
                        location.href = data.content.url;
                    } else {
                        //window.open(config.domain + data.url);
                        location.href = config.domain + data.content.url;
                    }
                } else {
                    searchInput.val(data.text);
                    baseSearch.submit();
                }
            }
            this.hide();
        }).on("render", function () {
            var index = 0,
                self = this;
            if (this.items) {
                this.items = this.items.filter(function () {
                    var item = $(this);
                    if (!self.isDisabledItem(item)) {
                        item.data("index", index);
                        var data = item.data("data");
                        data.index = index;
                        item.data("data", data);
                        index++;
                        return true;
                    }
                });
            }


            if (this.items && this.items.length) {
                this.panel.removeClass("Hide");
            } else {
                this.panel.addClass("Hide");
            }
        }).on("show", function () {
            var pos = searchInput.offset();

            this.panel.css({
                left: pos.left,
                top: pos.top + searchInput.outerHeight() - 1
            });
        });

        extend(searchPicker, {
            hotWords: [],
            // 是否是不可选项
            isDisabledItem: function (item) {
                return item[0].tagName !== "A";
            },
            // 清空匹配框
            clear: function () {
                this.wrapper.empty();
                this.items = $();
                this.selectedIndex = -1;
                this.emit('render');
            },
            // 没有输入时默认显示的匹配
            renderDefault: function () {
                var recentItems = recentSearch.get();
                if (recentItems.length || this.hotWords.length) {
                    if (recentItems.length && this.hotWords.length) {
                        recentItems.push({render_type: "spliter"});
                    }
                    if (this.hotWords.length) {
                        var recentItemsLast = [];
                        recentItems.push({render_type: "title", text: "热门搜索"});
                        recentItems = recentItems.concat(this.hotWords.slice(0, 5));
                        recentItems.forEach(function (item, index) {
                            if (typeof item === "string") {
                                var content = {"content": item};
                                recentItemsLast.push(content);
                            } else {
                                recentItemsLast.push(item);
                            }
                        });
                        recentItems = recentItemsLast;
                    }
                    this.render("", recentItems);
                } else {
                    this.clear();
                }
            },
            // 是否为回车、方向键等
            isCommand: function (e) {
                return e && /^(13|37|38|39|40)$/.test(e.keyCode);
            },
            // 请求数据并渲染
            fetch: lastRun(function (e) {
                var value = placeholder.getValue().trim(),
                    query = {},
                    url = replaceIndex(autoCompletePattern, [cityId, category]);

                var splited = url.split("?");
                if (splited[1]) {
                    query = parseQuery(splited[1]);
                }
                query["q"] = value;

                if (!searchPicker.isCommand(e)) {
                    var fetchCacheOne = fetchCache[value];
                    if (fetchCache[value]) {
                        if (value) {
                            var fetchCacheLast = [];
                            fetchCacheOne.forEach(function (item, index) {
                                if (typeof item === "string") {
                                    var content = {"content": item};
                                    fetchCacheLast.push(content);
                                } else {
                                    fetchCacheLast.push(item);
                                }
                            });
                            fetchCacheOne = fetchCacheLast;
                            searchPicker.render(value, fetchCacheOne);
                        } else {
                            searchPicker.renderDefault();
                        }
                    } else {
                        $.ajax({
                            url: splited[0] + "?" + toQueryString(query)
                        }).on('success', function (json) {
                            var arr;
                            var tops = [];
                            var bottoms = [];

                            if (json.code == 101) {
                                arr = json.msg.shop || [];

                                json.msg.more && json.msg.more.forEach(function (extra) {
                                    var pos = extra.position;
                                    if (pos == "top") {
                                        tops.push(extra);
                                    } else if (pos == "bottom") {
                                        bottoms.push(extra);
                                    }
                                });

                                arr = tops.concat(arr).concat(bottoms);

                                if (arr.length) {
                                    if (value === "") {
                                        searchPicker.hotWords = arr;
                                        searchPicker.renderDefault();
                                    } else {
                                        var lastArr = [];
                                        arr.forEach(function (data, i) {
                                            var content = {"content": data};
                                            lastArr.push(content);
                                        });
                                        searchPicker.render(value, lastArr);
                                    }
                                } else if (value) {
                                    searchPicker.clear();
                                }
                                fetchCache[value] = arr;
                            } else {
                                //searchPicker.render(value, []);
                                searchPicker.clear();
                            }
                        }).send();
                    }
                }
            })
        });


        // 删除最近搜索功能
        searchPicker.panel.on("click", ".remove", function (e) {
            var text = $(this).parent(".suggest-item").data("data").text;

            recentSearch.remove(text);
            searchPicker.renderDefault();

            e.stopPropagation();
        });

        searchPicker.panel.on("click", function (e) {
            e.stopPropagation();
        });

        searchInput
            .on("keyup", searchPicker.fetch)
            .on("paste", searchPicker.fetch)
            .on("focus", function () {
                searchPicker.show();
            })
            .on("keydown", function (e) {
                if (e.keyCode == 38 || e.keyCode == 40) {
                    searchInput.val(searchPicker.items.eq(searchPicker.selectedIndex).find(".keyword").text());
                }
            });
        searchPicker.fetch();
        searchPicker.renderDefault();
    }
}

module.exports = function (config) {
    config.domain = config.domain || "";

    init(config);
};

