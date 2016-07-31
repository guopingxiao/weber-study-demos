/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],function($provide){
    $provide.factory('factory1',function(){
            return ['1','2','3'];
    });

    $provide.service('service1',function(){
        return '111';
    })
});

myApp.controller('firstController',function($scope,service1,factory1){
    console.log(service1);
    console.log(factory1);
});


