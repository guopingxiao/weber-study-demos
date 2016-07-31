/**
 * Created by NEWEN on 2016/6/6.
 */

angular.module('myApp',[],function(){

})
    .directive('bookList',function(){
        return{
            restrict:'ECAM',
            template:'<div><ul><li ng-repeat="book in books">{{book.name}}</li></ul><add-book></add-book></div>',
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

                    $scope.$apply(function(){
                        $scope.books.push({
                            name:'java'
                        });
                    })
                }
            },
            controllerAs:'bookListController'
        }
    })

    .directive('addBook',function(){
        return{
            restrict:'ECAM',
            template:'<button type="button">添加</button>',
            replace:true,
            require:'^bookList',
            link:function(scope,iElement,iAttrs,bookListController){
                iElement.on('click', bookListController.addBook);
            }

        }
    })
    .controller('firstController',['$scope',function($scope){

    }]);

