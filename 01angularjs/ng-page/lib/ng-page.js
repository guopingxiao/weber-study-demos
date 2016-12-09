;
(function(angular){
	'use strict';
	angular.module('ng-page',[])
		.constant('ngPageConfig', {//通过constant()方法定义配置常量
		 
			firstText: 'First',
			lastText: 'Last',
			prevText: 'Pre',
			nextText: 'Next',
			goToText: 'Go To',
			visiblePage: 10,
			showFirstLastText: true,
			showIfOnePage: false,
			showGoTo: false			
		})
		.directive('pager',['ngPageConfig',function(ngPageConfig){
			return{
				replace: true,
				restrict: 'E',
				scope: { //开启独立作用域scope，pageCount 和 currentPage使用双向数据绑定，pageChange使用引用方法 ==》对应my-page指令的属性
					pageCount: '=',
					currentPage: '=',
					onPageChange: '&'   //在子级作用域中，通过函数的形式引用父作用域的$scope.onPageChange()==>页面上指令的属性on-page-change="onPageChange()"
				},
				template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
							'<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
							'<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
							'<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
							'<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
							'<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label></div>',				
				
							
				link:function(scope, element, attrs){
					scope.firstText = attrs.firstText || ngPageConfig.firstText;
					scope.lastText = attrs.lastText || ngPageConfig.lastText;
					scope.prevText = attrs.preText || ngPageConfig.prevText;
					scope.nextText = attrs.nextText || ngPageConfig.nextText;
					scope.goToText = attrs.goToText || ngPageConfig.goToText;
					scope.visiblePage = attrs.visiblePage || ngPageConfig.visiblePage;
					scope.showFirstLastText = attrs.showFirstLastText || ngPageConfig.showFirstLastText;
					scope.showIfOnePage = attrs.showIfOnePage || ngPageConfig.showIfOnePage;
					scope.showGoTo = attrs.showGoTo || ngPageConfig.showGoTo;
					
					//默认当前页为第一页
					scope.currentPage = 1;
					
					
					scope.pageChange =function(page) //页面跳转触发
					{
						if(page > 1 && page < scope.pageCount){
							scope.currentPage = page;
						}else{
							scope.currentPage = 1;
						}
					}
					
					function buildPage()//重新构建页面
					{
						var lowPage, highPage, subvisiblePage;
						scope.pagenums = [];
						
						if(scope.pageCount <= 0 ){
							return;
						}else if(scope.currentPage > scope.pageCount){
							scope.currentPage = 1;
						}
						
						if(scope.pageCount <= scope.visiblePage){// 页面较少时处理逻辑
							lowPage = 1;
							highPage = scope.pageCount;
						}else{
							subvisiblePage = Math.ceil(scope.visiblePage / 2);
							lowPage = Math.max(scope.currentPage - subvisiblePage, 1);
							highPage = Math.min(scope.currentPage + subvisiblePage - 1, scope.pageCount);
							//highPage = Math.min(lowPage + scope.pageCount - 1, scope.pageCount);
							if(highPage >=scope.pageCount)
							{
								lowPage = scope.pageCount - scope.visiblePage +1;
							}	
						}
						
						while(lowPage <= highPage){//将可见的页面push到数组里；
							scope.pagenums.push(lowPage);
							lowPage ++;
						}
					}
					
					scope.$watch('currentPage', function(newVlaue, oldValue){//对'currentPage'进行脏检查
						if(newVlaue != oldValue){
							buildPage();
							scope.onPageChange(); 
						}
					})
					
					scope.$watch('pageCount', function(newValue, oldValue)//对'pageCount'进行脏检查
					{
						if(!!newValue){
							buildPage();
						}
					})	
					
				}
			}
				
		}])
})(angular);








function chickenAndRabbit(foot,head)
{
    //兔子个数
    var rabbit=foot/2-head;
    //小鸡个数
    var chicken=head-rabbit;
    console.log("笼子里的鸡有"+ chicken +"头，兔子有"+rabbit+"头");
}


























