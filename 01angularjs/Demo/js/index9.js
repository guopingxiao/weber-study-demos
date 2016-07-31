var myAppModule = angular.module("myApp",[]);

	myAppModule.controller("firstConctroller",function($scope)
	{
		$scope.today = new Date();
		$scope.city = [
			{
				name:'shanghai',
				id:1231
			},
			{
				name:'beijing',
				id:1232
			},
			{
				name:'nanjing',
				id:1233
			},
			{
				name:'jiangxi',
				id:1234
			}
		];

		$scope.message = 'Hello World!';
		console.log($scope.city);
	});

	myAppModule.filter("uppercaseFirst",function(){
		return function(input){
			if (input) {
				input = input[0].toUpperCase() + input.slice(1);
				return input;
			};
		}
	});





