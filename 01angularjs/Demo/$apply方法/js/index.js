/**
 * Created by NEWEN on 2016/6/6.
 */
var firstController = function($scope){
    $scope.date = new Date();
    setInterval(function(){
        $scope.$apply(function(){
            $scope.date = new Date();
        });
    },1000);
};

