<template>
  <div id="app">
    <!-- 头部 -->
    <HeaderVue></HeaderVue>
    <!-- main -->
    <router-view></router-view>
    <!-- <Footer></Footer> -->
    <!-- 底部 -->
  </div>
</template>
<script>
import HeaderVue from './components/Header.vue'
import Footer from "./components/Footer.vue"
export default {
  components:{
    HeaderVue,
    Footer
  }
}
</script>
<style>
  #app{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
