/*angular.module("myApp",[])
	.run(function($rootScope){
		$rootScope.name="angular";
	});*/
angular.module("app",[])
app.controller('ParentController', function($scope) {
	$scope.person = {greeted: false};
});
app.controller('ChildController', function($scope) {
	$scope.sayHello = function() {
		$scope.person.name = 'Ari Lerner';
	};
});

