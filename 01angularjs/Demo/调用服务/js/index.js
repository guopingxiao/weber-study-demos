/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],function($provide){
    $provide.provider('service1',function(){
        this.$get = function(){
            return{
                message:'hahaha'
            }
        }
    });
});

myApp.controller('firstController',function($scope,service1){
    console.log(service1);
});


