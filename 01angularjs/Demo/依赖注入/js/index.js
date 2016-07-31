/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],function(){

})
.factory('factory1',function(){
    return{
        name:'张三'
    }
})
//显示依赖注入
.controller('firstController',['$scope','factory1',function($scope,factory1){
        $scope.data = factory1;
    }])
//隐示依赖注入
.controller('secondController', function($scope,factory1){
      $scope.data = factory1;
    });


