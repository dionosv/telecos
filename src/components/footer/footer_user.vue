<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <Logo_footer_user></Logo_footer_user>
      </div>
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-center text-xs leading-5 text-gray-500">&copy; telecos.live</p>
      </div>
    </div>
  </footer>
</template>

<script>  
import Logo_footer_user from '../logo/logo_footer_user.vue';

export default {
  name: 'FooterUser',
  components:{
    Logo_footer_user
  }
}
</script>