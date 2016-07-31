angular.module('myApp', [])

    .directive('bookList', function () {
        return {
            restrict: 'ECAM',
            controller: function ($scope) {

                // &books
                //$scope.books = $scope.a();//这里a()的作用域的上下文为父作用域的$scope，而左边的$scope为自身的作用域。

                // =books;
                 $scope.books = $scope.b;
                  $scope.b.push({name:'nodejs'}); //因为是双向绑定，所以这里push进去一个也会影响到子元素

                console.log($scope.c);

            },
            // 创建一个有继承链的独立作用域（可以继承父亲的独立作用域，设置为false时，两个scope的值是一样的。）
            // scope:true,如果是一个对象，就没有作用域练得继承了，要通过绑定的方式来读取父作用域的数据
            // &：把父作用域的属性包装成一个函数，通过函数的形式读写父作用域的属性

            // 当为对象的时候也会创建一个独立的作用域
            scope:{
                // 将父元素books封装成一个a函数
                 //a:'&books' //这里的books不是父元素的firstController的books,而是指令里的一个属性books，
                // 指令的books属性绑定了父元素的books，这样就可以找到父元素的books。
                // 双向绑定 b = parentBooks属性对应的父作用域的表达式
                 b:'=parentBooks'

                // 使用简单数据类型的方法，而且要{{}}，单向继承，不能改变父元素的属性值
                // c:'@parentTitle'
            },
            controllerAs:'bookListController',
            template: '<div><ul><li ng-repeat="book in books">{{book.name}}</li></ul></div>',
            replace:true

        }

    })


    .controller('firstController', ['$scope', function ($scope) {
        console.log($scope);

        $scope.books = [
            {
                name: 'php'
            },
            {
                name: 'javascript'
            },
            {
                name: 'java'
            }
        ];

        $scope.title = '张三';

    }]);