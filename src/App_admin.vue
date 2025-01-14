<template>


  <div v-cloak>
    <!-- <Header/> -->
     <Header_admin></Header_admin>
    <RouterView class="mx-auto max-w-7xl items-center p-3 sm:p-6 lg:px-8"/>
    <!-- <Footer/> -->
     <Footer_admin></Footer_admin>
  </div>

 


</template>

<script>
import { RouterLink,RouterView } from 'vue-router';
import Footer from './components/footer/footer_user.vue';
import Header from './components/header/header_user.vue';
import { always_scroll_on_top } from './components/logic/tools/handle_always_scroll_on_top';
import Header_admin from './components/header/header_admin.vue';
import Footer_admin from './components/footer/footer_admin.vue';

export default {
  components: {
    RouterLink,
    RouterView,
    Footer_admin,
    Header_admin
  },
  mounted(){
    always_scroll_on_top();
  }
 
  }
</script>

<style></style>