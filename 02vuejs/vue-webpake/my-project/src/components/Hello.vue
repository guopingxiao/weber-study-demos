<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showData">点击</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  props:['parentdata'],//this.parentdata可以取到
  methods:{
    showData(){
      console.log(this.parentdata);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
