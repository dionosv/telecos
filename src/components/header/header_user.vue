<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="-m-1.5 p-1.5">
        <Logo_divisi_footer />
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="toogle_mobile = true">
          <ion-icon id="menu" name="menu"></ion-icon>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link 
          v-for="item in navigation" 
          :key="item.name" 
          :to="{ name: item.route }" 
          class="text-sm leading-10 font-semibold"
        >
          {{ item.name }}
        </router-link>

        <router-link :to="{ name: 'akun'}" type="button" class="inline-flex items-center gap-x-1.5 rounded-md  bg-lime-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Akun
          <ion-icon name="person-circle" id="logo_akun"></ion-icon>
        </router-link>

      </div>
    </nav>
    <Dialog class="lg:hidden" @close="toogle_mobile = false" :open="toogle_mobile">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a class="-m-1.5 p-1.5" @click="closeMobileMenu">
            <Logo_divisi_footer />
          </a>
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="toogle_mobile = false">
            <ion-icon id="menu" name="menu"></ion-icon>

          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link 
                v-for="item in navigation" 
                :key="item.name" 
                :to="{ name: item.route }"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="closeMobileMenu"
              >
                {{ item.name }}
              </router-link>
            </div>
            <div class="py-6">
              <router-link :to="{ name: 'akun'}"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="closeMobileMenu">Akun</router-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script>
import Logo_divisi_footer from '../logo/logo_divisi_footer.vue';

export default {
  name: 'HeaderUser',
  components: {
    Logo_divisi_footer
  },
  data() {
    return {
      navigation: [
        { name: 'Konsultasi', route: 'daftar_ahli_konsultasi' },
        // { name: 'Bookings', route: 'bookings' },
        { name: 'Riwayat', route: 'riwayat_konsultasi' },
        // { name: 'Ahli', route: 'ahli' },
        { name: 'Artikel', route: 'landing_page_artikel' },
      ],
      toogle_mobile: false
    }
  },
  methods: {
    closeMobileMenu() {
      this.toogle_mobile = false
    }
  }
}
</script>

<style scoped>
#top_menu {
  display: flex;
  justify-content: center;
  align-content: center;
}

#logo_akun{
  font-size: 24px;
}

Dialog{
  z-index: 15;
}
</style>