angular.module('myApp', [])

    .filter('cityFilter', function () {
        return function (data, parent) {//过滤出属于某个省会的市，某个市的区；
            var filterData = [];
            angular.forEach(data, function (obj) {
                if (obj.parent === parent) {
                    filterData.push(obj);
                }
            })

            return filterData;
        }
    })


    .controller('firstController', ['$scope', function ($scope) {

        var that = this;

        $scope.cities = [
            {
                name: '上海',
                parent: 0,
                id: 1
            },
            {
                name: '上海市',
                parent: 1,
                id: 2
            },
            {
                name: '北京',
                parent: 0,
                id: 4
            },
            {
                name: '北京市',
                parent: 4,
                id: 5
            },
            {
                name: '浙江',
                parent: 0,
                id: 9
            },
            {
                name: '杭州',
                parent: 9,
                id: 100
            },
            {
                name: '宁波',
                parent: 9,
                id: 11
            },

        ];


        $scope.data = {
            city: 3
        };


        // 让城市关联起来，返回上一级的parentId
        this.findCityId = function (parent) {
            var parentId;
            angular.forEach($scope.cities, function (city) {
                if (city.id === parent) {
                    parentId = city.parent;
                    return;
                }
            })

            return parentId;
        }

        this.initCity = function(){
            if ($scope.data.city !== undefined) //区目录
                $scope.data.area = this.findCityId($scope.data.city);//关联到市级目录
                $scope.data.province = this.findCityId($scope.data.area);//关联到省级目录
            }
        }

        // 第一次打开页面 需要初始化一下
        //this.initCity.call(this);
		this.initCity();
    }]);
