<template>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex flex-1">
          <div class="hidden lg:flex lg:gap-x-12">
            <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
          </div>
          <!-- <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div> -->
        </div>

        <router-link :to="{ name: 'home_admin' }" class="flex flex-1 justify-center">
        <!-- <a href="#" class="-m-1.5 p-1.5">  -->
          <Logo_aja></Logo_aja>
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
        <!-- </a> -->
    </router-link>
        <div class="flex flex-1 justify-end">



          <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> -->

          <router-link :to="{ name : 'akun_admin' }" type="button" class="inline-flex items-center gap-x-1.5 rounded-md  bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            
            <ion-icon name="person-circle" id="logo_akun"></ion-icon>
            
            <p id="header_teks">
                Admin
            </p>
        
        </router-link>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div class="flex items-center justify-between">
            <div class="flex flex-1">
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <a href="#" class="-m-1.5 p-1.5"> 
              <Logo_aja></Logo_aja>
              <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
            </a>
 
          </div>
          <div class="mt-6 space-y-2">
            <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </template>
  
  <script>
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import Logo_aja from '../logo/logo_aja.vue'
  
  export default {
    name: 'HeaderAdmin',
    
    components: {
      Dialog,
      DialogPanel,
      Logo_aja
    },
    
    data() {
      return {
        navigation: [
        //   { name: 'Product', href: '#' },
        //   { name: 'Features', href: '#' },
        //   { name: 'Company', href: '#' }
        ],
        mobileMenuOpen: false
      }
    }
  }
  </script>

<style>


#logo_akun{
  font-size: 24px;
} 

@media (max-width: 768px) {
  #logo_akun{
    font-size: 1.3rem;
  } 

p#header_teks{
    font-size: 12px;
}

}

</style>