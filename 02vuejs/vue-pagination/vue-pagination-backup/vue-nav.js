(function(){
var tm = '<div class="page-bar">'+
            '<ul>'+
            '<li v-if="currentpage!=1"><a v-on:click="currentpage--">上一页</a></li>'+
            '<li v-for="index in indexs"  v-bind:class="{ active: currentpage == index}">'+
                '<a v-on:click="btnClick(index)">{{ index }}</a>'+
                '</li>'+
                '<li v-if="currentpage!=totlepage"><a v-on:click="currentpage++">下一页</a></li>'+
                '<li><a>共<i>{{totlepage}}</i>页</a></li>'+
            '</ul>'+
        '</div>'




    var navBar = Vue.extend({
        template: tm,
        props: ['currentpage', 'totlepage'],
        data: function(){
            
        },
        computed: {
            indexs: function()
			{
				  var left = 1
				  var right = this.totlepage
				  var ar = [] 
				  if(this.totlepage>= 11){
					if(this.currentpage > 5 && this.currentpage < this.totlepage-4){
							left = this.currentpage - 5
							right = this.currentpage + 4
					}else{
						if(this.currentpage<=5){
							left = 1
							right = 10
						}else{
							right = this.totlepage
							left = this.totlepage -9
						}
					}
				 }
				while (left <= right){
					ar.push(left)
					left ++
				}   
				return ar
           }
        },
        methods: {
            btnClick: function(data){
                if(data != this.currentpage){
                    this.currentpage = data 
                    this.$dispatch('btn-click',data) 

                }
            }
        }


        
    })

    window.Vnav = navBar


})()