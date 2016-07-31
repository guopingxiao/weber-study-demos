var myApp = angular.module('myApp', [] , function($provide){
	
// 1、通过$provide.provider自定义服务
	$provide.provider('provider',function(){
		this.$get = function(){
			return {
				message: 'xiaoguoping'
			}
		}
	});
	//console.log(1);

	$provide.provider('provider2',function(){
		this.$get = function(){
			return {
				message: 'xiaoguoping2'
			}
		}
	});




// 2、通过$provide.service自定义服务
	$provide.service('service1', function(){
			return [1,2,3,4,5,6];
	});
// 3、通过$provide.factory自定义工厂
	$provide.factory('factory1', function(){
			return "111";
	});

	// myApp.service('service1', function(){
	// 		return [1,2,3,4,5,6];
	// });

	// myApp.factory('factory1', function(){
 // 			return "111";
 // 	});
// 3、通过$provide.factory自定义工厂
	$provide.factory('factory1', function(){
			return "111";
	});

});
// 自定义的服务均可被其他服务调用，入controller.
myApp.controller('firstController', function($scope , provider, provider2, service1, factory1){
	$scope.name = '张三';
	console.log(provider);
	console.log(provider2);
	console.log(service1);
	console.log(factory1);
});