var firstController=function($scope){
	 $scope.date=new Date();
/*	setInterval(function(){
		// 这里虽然触发了时间，但是并没有进行脏检查。可以通过apply()方法；
		$scope.date = new Date();
		},1000);*/
	//上述操作被没有触发一秒钟更新一次date.要改变===》
	// 要么用set方法，要么用脏检查。以ng-开头的都会进行脏检查。

	setInterval(function(){
		$scope.$apply(function(){
			$scope.date = new Date();
		});
	},1000)
	/*	<!-- $scope.$apply()方法可以在angular框架之外执行angular JS
表达式 如：DOM时间、setTimeout、XHR或第三方库-->*/

}

