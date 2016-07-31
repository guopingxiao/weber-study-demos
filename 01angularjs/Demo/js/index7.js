var firstController=function($scope){
	 $scope.name="张三";
	 $scope.count=0;
	$scope.$watch("name",function(newValue,oldValue){
		console.log(newValue,oldValue);
		++$scope.count;
		if ($scope.count>10) {
			$scope.name="输入发生10次变化";
		};
	});
}

