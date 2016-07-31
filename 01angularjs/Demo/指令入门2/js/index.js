/**
 * Created by NEWEN on 2016/6/6.
 */

var myApp =angular.module('myApp',[],['$compileProvider',function($compileProvider){
    $compileProvider.directive('myDirect',function(){
        return{
            restrict:'ECA',
            template:'<div>directive-html</div>',
            replace:true
        }
    });
}]);




