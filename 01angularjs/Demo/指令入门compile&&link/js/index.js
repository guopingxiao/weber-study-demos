/**
 * Created by NEWEN on 2016/6/6.
 */
var i =0;
var myApp =angular.module('myApp',[],function(){

})
    .directive('customTags',function(){
        return{
            restrict:'ECAM',
            template:'<div>{{user.name}}</div>',
            replace:true,
            compile:function(tElement, tAttrs,transclude){
                tElement.append(angular.element('<div>{{user.name}}{{user.count}}</div>'))
                console.log('compile....')
                return{
                    pre:function preLink(scope,iElement,iAttrs,controller){
                        console.log('customTag preLink....');
                    },
                    post:function postLink(scope,iElement,iAttrs,controller){
                        iElement.on('click',function(){
                            scope.$apply(function(){
                                scope.user.name ='我变了';
                                scope.user.count = ++i;
                            });
                        });
                        console.log('All customTag postLink....');
                    }
                }
            },
            link:function(){

            }
        }
    })
    .directive('customTags2',function(){
        return{
            restrict:'ECAM',
            replace:true,
            compile:function(tElement, tAttrs,transclude){

                console.log('compile....')
                return{
                    pre:function preLink(){
                        console.log('customTag2 preLink....');
                    },
                    post:function postLink(){
                        console.log('All customTag2 postLink....');
                    }
                }
            },
            link:function(){

            }
        }
    })
    .controller('firstController',['$scope',function($scope){
        $scope.users = [
            {
                id:10,
                name:'张三'
            },
            {
                id:20,
                name:'李四'
            }
        ];
    }]);

