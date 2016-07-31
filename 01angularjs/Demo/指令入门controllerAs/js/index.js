/**
 * Created by NEWEN on 2016/6/6.
 */

angular.module('myApp',[],function(){

})
    .directive('bookList',function(){
        return{
            restrict:'ECAM',
            template:'<ul><li ng-repeat="book in books">{{book.name}}</li></ul>',
            controller:function($scope){
                $scope.books = [{
                    name:'php'
                },
                {
                    name:'javascript'
                },
                {
                    name:'angular'
                }];
                this.addBook = function(){
                    console.log('add a book');
                }
            },

            controllerAs:'bookController',
            link:function(scope,iElement,iAttrs,bookController){
                iElement.on('click',bookController.addBook);
            }
        }
    })
    .controller('firstController',['$scope',function($scope){

    }]);

