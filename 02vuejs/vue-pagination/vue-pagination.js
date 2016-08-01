(function(Vue){
	var template = '<div class="page-bar">'+
            '<ul>'+
            '<li v-if="currentPage!=1"><a v-on:click="currentPage--">上一页</a></li>'+
            '<li v-for="index in pagenums"  v-bind:class="{ active: currentPage == index}">'+
                '<a v-on:click="changePage(index)">{{ index }}</a>'+
                '</li>'+
                '<li v-if="currentPage!=totlePage"><a v-on:click="currentPage++">下一页</a></li>'+
                '<li><a>共<i>{{totlePage}}</i>页</a></li>'+
            '</ul>'+
        '</div>'

	var vuePager = Vue.extend({
		template: template,
		props:['currentPage','totlePage'],
		data: function(){//暂时不提供，实际业务的js提供；
			
		},
		computed: {
			visiblePage:10,
			pagenums: function(){
				var lowPage = 1;
				var highPage = this.totlePage;
				var pageArr = [];
				if(this.totlePage > this.visiblePage){
					var subVisiblePage = Math.ceil(this.totlePage/2);
					if(this.currentPage > subVisiblePage && this.currentPage < this.totlePage - visiblePage -1){//处理正常的分页
						lowPage = this.currentPage - subVisiblePage;
						highPage = this.currentPage + subVisiblePage -1;
					}else if(this.currentPage < subVisiblePage){//处理前几页的逻辑
						lowPage = 1;
						highPage = this.visiblePage;
					}else{//处理后几页的逻辑
						lowPage = this.totlePage - this.visiblePage + 1;
						highPage = this.totlePage; 
					}
				}
				//确定了上下page边界后，要准备压入数组中了
				while(lowPage <= highPage){
					pageArr.push(lowPage);
				}

				return pageArr;
			}
		},
		methods:{
			pageChange: function(page){
				if (this.currentPage != page) {
					this.currentPage = page;
					this.$dispatch('page-change', page);
				};
			}
		}

	});

	window.vuePager = vuePager;
})(Vue)