<template>
  <div id="app">
    <h3>{{title}}</h3>
    <input type="text" v-model="addText" @keyup.enter="addItem">
    <ul>
      <li v-for="item in todos" :class="{completed:item.completed}" @click="Troggle(item)">{{item.type}}</li>
    </ul>
    <hello parentdata="parentData"></hello><!--父元素的parentData数据，传递给了子组件的props属性上，子组件子在
    自定义的模块通过props属性接受即可拿到数据-->
  </div>
</template>

<script>
import Store from './store'
//相当于new Vue({})//
import Hello from './components/Hello'
export default {
  data(){
    return{
      title:'this is a todo list',
      todos:Store.get()
//        [
//        {type:"coding",completed:false},
//        {type:"walking", completed:true}
//      ],
      ,
      addText:'',
      parentData:'data from parent'
    }
  },
  components: {
      Hello
  },
  methods:{
    addItem(){
      this.todos.push({type:this.addText,completed:false});
      this.addText ='';
    },
    Troggle(item){
      item.completed = !item.completed;
    }
  },
  watch:{
    'todos':{
      handler(newVal, oldVal){
        Store.set(newVal);
      },
      deep:true
    }
  }
}
</script>

<style>
  .completed{
    text-decoration: line-through;
  }
</style>
