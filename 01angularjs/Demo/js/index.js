var firstController=function($scope){
	$scope.date=new Date();
	setInterval(function(){
		$scope.$apply(function(){
			$scope.date=new Date();
		})},1000);
}

var secondController=function($scope){
	$scope.name="李四";
	console.log($scope.name);
}