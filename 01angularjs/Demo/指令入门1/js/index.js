/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],function(){

})

//显示依赖注入
.controller('firstController',['$scope',function($scope){
    $scope.status = false;
    $scope.changeStatus = function(event){
        $scope.status = !$scope.status;
        angular.element(event.target).html('切换状态' + $scope.status);
    }
    }])



