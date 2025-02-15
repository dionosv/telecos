<template>
    <div>
      <h2 class="text-base font-semibold leading-6 text-gray-900">Dashboard Admin</h2>
      <p class="mt-1 text-sm text-gray-500">Selamat Datang di dashboard admin</p>
      <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
        <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="person" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: '' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Pengguna</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Manajemen Pengguna</p>
            </div>
          </div>
        </li>

        <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="body" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: 'lihat_ahli_admin' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Ahli</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Manajemen Ahli</p>
            </div>
          </div>
        </li>

        <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="newspaper" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: 'artikel_admin' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Artikel</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Manajemen Artikel</p>
            </div>
          </div>
        </li>

        <!-- <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="grid" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: 'lihat_sesi_admin' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Sesi</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Manajemen sesi</p>
            </div>
          </div>
        </li> -->

        <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="document" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: 'lihat_transaksi_admin' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Transaksi</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Manajemen Transaksi</p>
            </div>
          </div>
        </li>

        <li class="flow-root">
          <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
            <div class="bg-blue-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
              <ion-icon name="information-circle" class="h-6 w-6 text-white"></ion-icon>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                <router-link :to="{ name: 'telecos_care_admin' }" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <span>Telecos Care</span>
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Lihat Laporan Telecos Care</p>
            </div>
          </div>
        </li>
      </ul>

      <div class="telecos_version flex justify-center mt-6">
        <p class="text-sm text-blue-600">Telecos Version 1.0.0</p>
      </div>
      <!-- <div class="mt-4 flex">
        <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Or start from an empty project
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> -->

    </div>
</template>

<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/admin/admin_save_session_service';

export default {
  name: 'HomeAdmin',

  mounted() {
    this.cek_login_admin();
  },
  methods : {
    cek_login_admin(){
      const x = usetelecos_session_detailsStore();
      if(!x.load_admin_telecos()){
        // console.log('Anda belum login');
        this.$router.push({ name: 'akun_admin' });
      }
    }
  }
}
</script>