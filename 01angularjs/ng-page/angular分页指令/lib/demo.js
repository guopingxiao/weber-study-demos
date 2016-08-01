// define(function(require, exports, module) {

    // var product = {
        // bindEvent: function()
        // {
			// var myModule = angular.module("myModule", []);
			// myModule.controller('MyCtrl', ['$scope',
				// function($scope) {
					// $scope.Name = "Puppet";
				// }
			// ]);
			
        // },
		
		// angular.bootstrap(document, ['myModule']);


    // };
	// module.exports = {"bindEvent": product.bindEvent}; /*只把bindEvent函数暴露给外部*/
// });
define(function (require, exports, module){
	var product = {
		bindEvent:function(){
			var myModule = angular.module("myModule", ['ng-pagination']);
			myModule.controller('MyCtrl', ['$scope',function($scope) {
					$scope.Name = "Puppet";
					$scope.onPageChange = function() {
						console.log($scope.currentPage);
						//$scope.getDate = function($scope.currentPage){
							//$.get('');
						//}
					};
					$scope.pageCount = 100;
				}
			]);

			/**
			 * 这里要用ready函数等待文档初始化完成
			 */
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['myModule']);
			});
		}
	}
	module.exports = {"bindEvent": product.bindEvent};
});
