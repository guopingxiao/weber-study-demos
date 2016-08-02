(function(Vue){
	var template = '<div class="page-bar">'+
            '<ul>'+
            '<li v-if="currentpage!=1"><a v-on:click="currentpage--">上一页</a></li>'+
            '<li v-for="index in pagenums"  v-bind:class="{ active: currentpage == index}">'+
                '<a v-on:click="pageChange(index)">{{ index }}</a>'+
                '</li>'+
                '<li v-if="currentpage!=totlepage"><a v-on:click="currentpage++">下一页</a></li>'+
                '<li><a>共<i>{{totlepage}}</i>页</a></li>'+
            '</ul>'+
        '</div>'

	var vuePager = Vue.extend({
		template: template,
		props:['currentpage','totlepage','visiblepage'], //接收父组件的data对象数据，最好用小写，用驼峰式，在html里要横杠，麻烦！尽量显式地使用 props 传递数据
		data: function(){//暂时不提供，实际业务的js提供；

		},
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
		methods:{
			pageChange: function(page){
				if (this.currentpage != page) {
					this.currentpage = page;
					this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
				};
			}
		}

	});

	window.vuePager = vuePager;
})(Vue)