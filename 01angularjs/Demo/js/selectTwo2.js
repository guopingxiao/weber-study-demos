angular.module('myApp', [])

    .filter('typeFilter', function () {
        return function (data, parent) {//过滤出属于某个省会的市，某个市的区；
            var filterData = [];
            angular.forEach(data, function (obj) {
                if (obj.sBusikey === parent) {
                    filterData.push(obj);
                }
            })

            return filterData;
        }
    })


    .controller('firstController', ['$scope', function ($scope) {

        var that = this;

        $scope.types = [
            {
                sBusiDesc: "移动端评论",//name
                sBusikey:"all_mobile",//parent
                sDetailBusiDesc:"boss图鉴",
                sDetailBusikey:"boss_illustrations_mobile"
            },
            {
                sBusiDesc:"移动端评论",
                sBusikey:"all_mobile",
                sDetailBusiDesc:"死亡地图",
                sDetailBusikey:"death_map_mobile"
            },
            {
                sBusiDesc:"移动端评论",
                sBusikey:"all_mobile",
                sDetailBusiDesc:"枪械中心",
                sDetailBusikey:"gun_center"
            },
            {
                sBusiDesc:"移动端资讯",
                sBusikey:"feed_mobile",
                sDetailBusiDesc:"",
                sDetailBusikey:""
            },
            {
                sBusiDesc:"移动端视频",
                sBusikey:"video_mobile",
                sDetailBusiDesc:"",
                sDetailBusikey:""
            }
        ];
        $scope.sDetailBusikey = 1;

        $scope.typeFilter = function(arr, parent){
            $scope.sDetailBusikey = "";
            var filterData = [];
            if(!$scope.sBusikey){
                return;
            }
            angular.forEach(arr, function (obj) {
                if (obj.sBusikey === parent) {
                    filterData.push(obj);
                } 
            });
            if (filterData[0].sDetailBusikey == ""){
                $scope.showSub = false;
            }else{
                $scope.showSub = true;
            }
            $scope.subTypes = filterData;
            return $scope.subTypes;
        }

        $scope.uniqueFun = function(arr){
            var arrTemp = [];
            angular.forEach(arr, function(item){
                arrTemp.push(item.sBusikey); 
            });
            var arrTemp2 = [];
            for(var i = 0; i < arrTemp.length; i++){
                if (arrTemp.indexOf(arrTemp[i]) == i) {
                    arrTemp2.push(arr[i]);
                }
            }
            return arrTemp2;
           
        };
        $scope.artTypes = $scope.uniqueFun($scope.types);

    }]);
