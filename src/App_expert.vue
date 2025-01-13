<template>
  <div class="app-container" v-cloak>
    <Header/>
    <main class="main-content">
      <RouterView/>
    </main>
    <Footer_expert/>
  </div>
</template>

<script>
import { RouterLink,RouterView } from 'vue-router'; 
import Header from './components/header/header_expert.vue';
import { always_scroll_on_top } from './components/logic/tools/handle_always_scroll_on_top';
import Footer_expert from './components/footer/footer_expert.vue';

export default {
  components: {
    RouterLink,
    RouterView, 
    Header,
    Footer_expert
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
  margin-bottom: 3rem;
}
</style>