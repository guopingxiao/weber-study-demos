var myApp = angular.module("myApp",[]);

myApp.factory('Data', function(){
	return {message:'小平果'};

});

myApp.factory('Service', ['$windows', function(a){
	console.log(a);
}])


// 1、隐示的依赖注入
myApp.controller('firstController',  function($scope,Data){

	$scope.Data = Data;
});

// 2、显示的依赖注入
myApp.controller('secondController', ['$scope','Data', function(a,b){
	a.Data = b;
	console.log(a,b);
}]);


