var myApp = angular.module('myApp', []);

myApp.factory('Data', function(){
	return {message:'小平果'};

});

myApp.controller('firstController',  function($scope,Data){
	$scope.person = {
		name: "肖果平"
	};

	$scope.Data = Data;
});

myApp.controller('secondController',  function($scope,Data){
	$scope.person = $scope.$$prevSibling.person;//基本类型不能变的，只有对象才能引用
	$scope.Data = Data;
});

