

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import MainComponent from './components/MainComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import Cart from './components/Cart.vue';
import axios  from 'axios';
import {store} from './store'



export default {
  name: "App",
  data(){
    return{
        store,
    }
  },
  components:{
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Cart,
    
  },
  
  methods: {

  }}
</script>

<template>
  <HeaderComponent />
  
    <!-- <MainComponent/> -->
    <router-view></router-view>
  <FooterComponent/>
  <Cart/>

</template>

<style lang="scss" >
@use "./assets/scss/main.scss";
</style>
