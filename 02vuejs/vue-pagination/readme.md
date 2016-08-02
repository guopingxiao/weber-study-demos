##vue实现一个分页组件vue-paginaiton

vue使用了一段时间的感触就是，我再也不想直接操作DOM了。数据绑定式的编程体验真是好。实现的一个分页组件。

这里的css就不放出来了，可以看直接去github上下载：[vue-pagination](https://github.com/guopingxiao/weber-study-demos/tree/master/02vuejs/vue-pagination)

先上一张实例图吧

![](http://i.imgur.com/IinkCX9.png)

###模版

```
<div class="page-bar">
	<ul>
		<li v-if="showFirstText"><a v-on：click="cur--">上一页</a></li>

		<li v-for = "index in pagenums">
			<a v-on:click="pageChange(index)">{{index}}</a>

		</li>

		<li v-if="showNextText"><a v-on：click="cur++">下一页</a></li>
		<li><a>共<i>{{all}}</i>页</a></li>
	</ul>

</div>
```

![](http://i.imgur.com/e4w6vpD.png)

在未引入js前,页面的显示,分析下,all字段简单直接输出即可,{{index}}是分页码这个需要一些动态的渲染。


```
var app = new Vue({
      el: '#app',
      data:{
        currentpage: 1,
        totlepage: 28,
        visiblepage:10,
        msg: ''
      },
})
```

调用 new Vue({参数}) 就是创建了一个基本的组件,赋值给变量 app.el就是element的缩写,定位模版的位置.data就是数据了.知道了总页数但是要显示页码还是要一番计算,所以显示页码就是计算属性了.所以我们要用computed

```
computed: {
			//计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
			pagenums: function(){
				//初始化前后页边界
				var lowPage = 1;
				var highPage = this.totlepage;
				var pageArr = [];
				if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
					var subVisiblePage = Math.ceil(this.visiblepage/2);
					if(this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
						lowPage = this.currentpage - subVisiblePage;
						highPage = this.currentpage + subVisiblePage -1;
					}else if(this.currentpage <= subVisiblePage){//处理前几页的逻辑
						lowPage = 1;
						highPage = this.visiblepage;
					}else{//处理后几页的逻辑
						lowPage = this.totlepage - this.visiblepage + 1;
						highPage = this.totlepage; 
					}
				}
				//确定了上下page边界后，要准备压入数组中了
				while(lowPage <= highPage){
					pageArr.push(lowPage);
					lowPage ++;
				}

				return pageArr;
			}
		},
```

观看html模版发现`v-if`指令.很明显当内容是true就输出,否就没。

**重点看下**

  

```
 <li v-for="index in pagenums"  v-bind:class="{ active: currentpage == index}">
       <a v-on:click="pageChange(index)">{{ index }}</a>
   </li>
```

v-for是循环渲染输出计算属性pagenums.每一次循环的子元素赋值给index v-bind:class绑定class,当渲染到目前的角标的时候加个class v-on:click是绑定了事件，我把index当参数传进入了,后面做判断，默认传event事件.
然后我们给Vue的选项里面再增加methods字段

```
methods:{
			pageChange: function(page){
				if (this.currentpage != page) {
					this.currentpage = page;
					this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
				};
			}
		}
```

###组件交互

组件写完了，问题来了，用户点击发生页面改变，你怎么通知其他组件作出相应的变化. 可以在页角发生改变的函数下，插一条语句通知其他组件。不过这种方法是很差的做法。可以使用

```
watch: {
    currentpage: function(oldValue , newValue){
                    console.log(arguments)
            }
}
```

观察了currentpage数据当它改变的时候，可以获取前后值。然后通知其他组件。

完整的代码可以看 github:[vue-pagination](https://github.com/guopingxiao/weber-study-demos/tree/master/02vuejs/vue-pagination)

参考：https://segmentfault.com/a/1190000003931500
