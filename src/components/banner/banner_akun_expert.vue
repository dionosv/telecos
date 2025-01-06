<template>
  <div v-if="isVisible" class="h-[42px] relative z-10 sticky top-0 sticky"> <!-- added sm:sticky -->
    <Transition name="fade">
      <div  class="absolute w-full flex items-center gap-x-6 bg-orange-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 z-50">
        <p class="text-sm leading-6 text-white">

            <strong class="font-semibold">Perhatian</strong>

            <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
            Anda akan masuk dengan akun expert,  
            <router-link class="underline" :to="{ name: 'akun' }">

            klik di sini untuk masuk sebagai user

            </router-link>
            
       
        </p>
        <div class="flex flex-1 justify-end relative z-[5]"> <!-- added z-index -->
          <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]" @click="isVisible=!isVisible">
            <span class="sr-only">Dismiss</span>
            <ion-icon name="close-outline" class="h-5 w-5 text-white"></ion-icon>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script> 

export default {
  data() {
    return {
      isVisible: true
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>