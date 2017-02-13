<template>
  <div id="app">
    <pagenation :current="1" :total="40" :currentChange="whenChange"></pagenation>
  </div>
</template>
<script>
import page from './components/page'
import Vue from 'vue'
Vue.use(page);

export default{
  name:'app',
   data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    whenChange(item){
      console.log(item);
    }
  }
}
</script>
<style>
</style>