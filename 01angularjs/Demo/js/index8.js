var cartController=function($scope){
	$scope.cart=[
		{
			id:1000,
			name:"iphone5s",
			quantity:3,
			price:4800,


		},
		{
			id:1001,
			name:"iwatch",
			quantity:4,
			price:25000,


		},
		{
			id:1002,
			name:"imac",
			quantity:5,
			price:18000,


		},
		{
			id:1003,
			name:"ipad",
			quantity:6,
			price:6800,


		}
	];

	// 计算总的购买数量
/*	$scope.totalQuantity=function(){
		var total=0;
		angular.forEach($scope.cart, function(item){
			total+=item.quantity;
		})
		return total;
	}*/
	$scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += parseInt(item.quantity);
        })
        return total;
    }

		// 计算总的购买价格
	$scope.totalPrice=function(){
		var total=0;
		angular.forEach($scope.cart,function(item){
			total+=item.quantity * item.price;
		})
		return total;
	}

	var findIndex=function(id){
		var index=-1;
		angular.forEach($scope.cart,function(item,key){
			if (item.id===id) {
				index=key;
				return;
			}	
		})
		return index;
	}

	$scope.remove=function(id){
		var index=findIndex(id);
		
		if (index!==-1) {
			$scope.cart.splice(index,1);
		};
	}

    $scope.add = function (id) {
        var index = findIndex(id);

        if (index !== -1) {
            ++$scope.cart[index].quantity;
        }
    }

     $scope.reduce = function (id) {
        var index = findIndex(id);
        var item=$scope.cart[index];
        if (index !== -1) {
        	if (item.quantity>1) {
        		--item.quantity;
        	}else{
        		var returnKey=confirm("确定删除该商品？");
        		if (returnKey) {$scope.remove(id)};
        	}
            
        }
    }

// 解决用户输入负数的情况
	$scope.$watch("cart",function(newValue,oldValue){
		angular.forEach(newValue,function(item,key){
			if (item.quantity<1) {
				var returnKey=confirm("确定删除该商品？");
        		if (returnKey) {
        			$scope.remove(item.id);}
				else{
					item.quantity=oldValue[key].quantity;
				}
			}
		})

	},true);



}
