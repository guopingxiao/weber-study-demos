/**
 * Created by NEWEN on 2016/6/6.
 */
var firstController = function($scope){
  $scope.name = "张三";
   $scope.count = 0;
    $scope.$watch('name',function(newValue, oldValue){
        ++$scope.count;
        if($scope.count >20){
            $scope.name = "已经大于20次了";
        }
    });
};

