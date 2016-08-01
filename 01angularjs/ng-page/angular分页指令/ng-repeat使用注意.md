angular中ng-repeat性能测试
由于angularjs数据的双向绑定特性，当scope中的数据发生改变的时候，会自动刷新界面。
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>index</title>

</head>

<body ng-app="app" ng-controller="demoCtrl">

      <input type="button" value="first" ng-click="first();"/>
      <div>begin</div>
      <div id="content">
        <div ng-repeat="item in dataList">{{item.name}}</div>
      </div>
      <div>end</div>

  <script src="lib/angular-1.2.21.min.js"></script>

  <script type="text/javascript">
  window.onload = function(){
    
    var dom = document.getElementById("content");
    dom.addEventListener("DOMNodeRemoved",function(event){
          console.log("some dom was deleted.");
    });
  
  };
  var app = angular.module('app', []);
  app.controller('demoCtrl', function($scope) {
    $scope.dataList = [ 
                    {"id":1,"name":"a1"},
                    {"id":2,"name":"a2"},
                    {"id":3,"name":"a3"},
                    {"id":4,"name":"a4"}
                  ];
        
        $scope.first = function(){
        $scope.dataList = [ 
                  {"id":1,"name":"b1"},
                  {"id":2,"name":"b2"},
                  {"id":3,"name":"b3"},
                  {"id":4,"name":"b4"},
                  {"id":5,"name":"b5"}
                  ];
                }
        
        // }
        // 顺序发生变化
        // $scope.dataList = [ 
        //             {"id":4,"name":"b1"},
        //             {"id":2,"name":"b2"},
        //             {"id":3,"name":"b3"},
        //             {"id":1,"name":"b4"},
        //             {"id":0,"name":"b5"}
        //             ];
        //     }

  });
  </script>
</body>

</html>

当点击first按钮的时候，scope中的dataList数据发生了变化，界面会自动刷新。如果要实现dom的刷新有2种方式：
方式一：删除之前所有存在的dom，然后重新生成dom。
方式二：重用之前的dom元素，仅仅更新dom元素的属性。

在没有使用track by的情况下，angular采用的是方式一，这一点可以通过我们注册的DOMNodeRemoved事件处理函数得到证实。我们知道dom的频繁操作是非常耗费性能的，那为什么 ng-repeat 不能利用已有的 dom 元素去更新数据呢？因为你没有把数组元素的标识属性告诉它，ng-repeat不知道怎么替换。在没有使用track by的情况下，我们可以看到 ng-repeat 往数组里每个元素加了一个 $$hashKey 的属性：

![](http://i.imgur.com/B4BA5k9.png)

![](http://i.imgur.com/1XiHFM9.png)

这个 key 是由 Angular 内部的 nextUid() 方法生成，类似数据库自增，但是是使用字符串。现在我们明白了，因为每次替换数组都会导致 ng-repeat 为每个元素生成一个新 key, 所以根本没办法重用已有的 Dom 元素。那怎么解决这个问题呢？就是使用track by子语句。将ng-repeat改成下面的方式1或者方式2，就可以发现没有dom删除事件。

<!--方式1-->
<div ng-repeat="item in dataList track by item.id">{{item.name}}</div>

<!--方式2-->
<div ng-repeat="item in dataList track by $index">{{item.name}}</div>

下面这段代码中，我们改变dataList的顺序，然后使用track by $index和track by item.id看看是什么效果。

可以看到使用track by $index的时候，不会发生dom删除事件，即是更新dom元素， 而不是先删除再新建。当使用track by item.id的时候，会发生dom删除事件。也就是说，当数组中元素顺序改变的时候，使用track by item.id与不使用track by没有什么差别。大家可以试试看当数组的长度发生变化时，ng-repeat的表现是什么样子的。

而当长度发生变化时，两者都可以复用dom,不会发生dom删除事件；
ng-repeat中track by的作用
当我们在使用ng-repeat一个数组时，经常会遇到这么一个错误
<div ng-repeat="links in slides">
    <div ng-repeat="link in links track by $index">{{link.name}}</div>
</div>
Error: [ngRepeat:dupes]这个出错提示具体到题主的情况，意思是指数组中有2个以上的相同数字。ngRepeat不允许collection中存在两个相同Id的对象

> For example: item in items is equivalent to item in items track by $id(item). This implies that the DOM elements will be associated by item identity in the array.

对于数字对象来说，它的id就是它自身的值，因此，数组中是不允许存在两个相同的数字的。为了规避这个错误，需要定义自己的track by表达式。例如：item
 in items track by item.id或者item in items track by fnCustomId(item)。嫌麻烦的话，直接拿循环的索引变量$index来用item
 in items track by $index

如果是javascript对象类型数据，那么就算内容一摸一样，ng-repeat也不会认为这是相同的对象。如果将上面的代码中dataList，那么是不会报错的。比如$scope.dataList = [{"age":10},{"age":10}];