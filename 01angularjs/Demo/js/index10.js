/*angular.module("myApp",[])
	.run(function($rootScope){
		$rootScope.name="angular";
	});*/

angular.module("myApp",[])
	.controller('myController',function($scope){
		$scope.account=0;
		$scope.add = function(){$scope.account += 1;};
		$scope.substract = function(){$scope.account -=1;};
		$scope.person={name:'xiaoguoping',age:24};
		$scope.name="angular";
		console.log($scope.account);
	});


