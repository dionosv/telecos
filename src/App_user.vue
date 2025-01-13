<template>
  <div class="app-container" v-cloak>
    <Header/>
    <main class="main-content">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import { RouterLink,RouterView } from 'vue-router';
import Footer from './components/footer/footer_user.vue';
import Header from './components/header/header_user.vue';
import { always_scroll_on_top } from './components/logic/tools/handle_always_scroll_on_top';

export default {
  components: {
    RouterLink,
    RouterView,
    Footer,
    Header
  },
  mounted(){
    always_scroll_on_top();
  }
 
  }
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>