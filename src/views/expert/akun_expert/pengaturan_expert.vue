<template>

    <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div class="w-full max-w-sm space-y-10">
      
        <!-- <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hey {{ nama.split(' ')[0] }}</h2>
        </div> -->


        <nav class="flex flex-1 flex-col" aria-label="Sidebar">
            <ul role="list" class="-mx-2 space-y-1">

                <li>
                    <router-link :to="{ name: 'detail_akun_expert' }"
                        class="text-gray-700 hover:bg-orange-50 hover:text-orange-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Detail Akun</router-link>
                </li>
                <!-- <li>
                    <router-link :to="{ name: 'daftar_ahli_favorit' }"
                        class="text-gray-700 hover:bg-orange-50 hover:text-orange-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Daftar Ahli Favorit</router-link>
                </li> -->
                <li>
                    <router-link :to="{ name: 'pembayaran' }"
                        class="text-gray-700 hover:bg-orange-50 hover:text-orange-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Saldo</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'pusat_bantuan' }"
                        class="text-gray-700 hover:bg-orange-50 hover:text-orange-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Pusat Bantuan</router-link>
                </li>
 
                <li>
                    <span @click="logout()" id="logout"
                        class="bg-red-50 text-red-600 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Keluar Akun</span>
                </li>
            </ul>
        </nav>

    </div>
    </div>

</template>

<script>

import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session';
// import { logout } from '@/components/logic/API/user';

export default {

    data() {
        return { 
        }
    },
    methods: {
        async logout(){
            const sessionStore = usetelecos_session_detailsStore();
            await sessionStore.cleartelecos_session_details();
            window.location.reload();
        }

    },

}
</script>

<style>
#logout{
    cursor: pointer;
}
</style>