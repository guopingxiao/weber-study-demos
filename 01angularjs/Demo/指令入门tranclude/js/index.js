/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],function(){

})
.directive('myDirect',function(){
    return{
        restrict:'ECM',
        template:'<div>directive-html</div>',
        replace:true
    }
})
    .controller('firstController',['$scope',function($scope){
      $scope.name = '张三';
    }]);



