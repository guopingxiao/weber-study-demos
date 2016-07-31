angular.module('myApp', [],function(){})
.controller('cusController', ['$scope','$http', function($scope,$http){
	$http.get("custom_JSON.json")
	.success(function(response){
		$scope.cusInfo = response.records;
	});
}])


