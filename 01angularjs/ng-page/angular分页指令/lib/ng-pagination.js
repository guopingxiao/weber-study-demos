;
(function (angular) {
  'use strict';
  angular.module("ng-pagination", [])
    .constant('ngPaginationConfig', {// 利用module的constant方法定义默认选项
      visiblePageCount: 10,  //一共可以显示几页
      firstText: 'First',    //首页
      lastText: 'Last',      //尾页
      prevText: 'Prev',      //上一页
      nextText: 'Next',      //下一页
      showIfOnePage: false,  //一页数据不显示分页
      showFirstLastText: true,//是否显示首页，尾页
      gotoText: 'Goto Page',  //页面跳转
      showGoto: false         //是否显示goto 框
      //定义指令pager，注入ngPaginationConfig参数
    }).directive("pager", ['ngPaginationConfig', function (ngPaginationConfig) {
      return {
        link: function (scope, element, attrs) {//配置初始化参数
          var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : ngPaginationConfig.visiblePageCount;
          scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : ngPaginationConfig.firstText;
          scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : ngPaginationConfig.lastText;
          scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : ngPaginationConfig.prevText;
          scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : ngPaginationConfig.nextText;
          scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : ngPaginationConfig.showFirstLastText;
          scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : ngPaginationConfig.showIfOnePage;
          scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : ngPaginationConfig.gotoText;
          scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : ngPaginationConfig.showGoto;
          scope.currentPage = 1; //默认显示第一页

          scope.pageChange = function (page) { //页面跳转
            if (page >= 1 && page <= scope.pageCount) {
              scope.currentPage = page; //当前页==pageChange中ng-repeat的track by 参数
            } else {
              scope.currentPage = 1;
            }
          }

          scope.keyupHanlder = function (e) {//处理输入页码跳转逻辑
            var value = e.target.value;
            var parsedValue = parseInt(value, 10);
            if (!Number.isNaN(parsedValue)) {
              if (parsedValue >= 1 && parsedValue <= scope.pageCount) {

              } else if (parsedValue < 1) {
                e.target.value = 1;
              } else {
                e.target.value = scope.pageCount;
              }
              if (e.keyCode === 13) {
                // pressed enter
                scope.currentPage = parsedValue;
              }
            } else {
              if (e.preventDefault) {
                e.preventDefault();
              } else {
                return false;
              }
            }
          }

          function build() {//重新构建页码
            var low,  //页面显示的下界
              high,   //页码显示的上届
              v;      //页码对半分

            scope.pagenums = [];

            if (scope.pageCount === 0) { //没有页码
              return;
            }
            if (scope.currentPage > scope.pageCount) {//页码太大
              scope.currentPage = 1;
            }

            if (scope.pageCount <= visiblePageCount) { //页码小于显示的要求，从第一页开始显示
              low = 1;
              high = scope.pageCount;
            } else {
              v = Math.ceil(visiblePageCount / 2);
              low = Math.max(scope.currentPage - v, 1); //前半部分，包括前几页处理
              high = Math.min(low + visiblePageCount - 1, scope.pageCount); //后半部分

              if (scope.pageCount - high < v) { //处理最后几页，low要发生变化
                low = high - visiblePageCount + 1;
              }
            }

            for (; low <= high; low++) {
              scope.pagenums.push(low);   //将页码push到数组里
            }
          }

          scope.$watch('currentPage', function (a, b) {//$watch进行脏检查，监测currentPage变化
            if (a !== b) {
              build();  //重新获取页码
              scope.onPageChange();//在子级作用域中，通过函数的形式引用父作用域的$scope.onPageChange()==>页面上指令的属性on-page-change="onPageChange()"
            }
          });

          scope.$watch('pageCount', function (a, b) {//$watch进行脏检查，监测pageCount变化
            if (!!a) {
              build();
            }
          });

        },
        replace: true,
        restrict: "E",
        scope: {//开启独立作用域，pageCount和currentPage使用双向绑定，onPageChange();
          pageCount: '=',
          currentPage: '=',
          onPageChange: '&'
        },
        template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
        '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
        '<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
        '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
        '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
        '<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label></div>'
      }
    }]);
})(angular);
