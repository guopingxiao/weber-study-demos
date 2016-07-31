/**
 * Created by NEWEN on 2016/6/10.
 */
angular.module('myApp',[],function(){})
.directive('requireMutiple',function(){
        return{
            require:'^ngModel',
            link:function(scope,ele,attrs,c){
                c.$validators.validated = function(modelValue){
                    if(scope.data.name == 'xiaoxia'){
                        console.log('success!');
                    }
                }
            }
        }
    })
    .controller('firstController',['$scope',function($scope){
        $scope.data={
            name:'xiaoxia'
        }
    }]);