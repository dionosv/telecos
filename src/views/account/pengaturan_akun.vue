<template>

    <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div class="w-full max-w-sm space-y-10">

            <!-- <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hey {{ nama.split(' ')[0] }}</h2>
        </div> -->


            <nav class="flex flex-1 flex-col" aria-label="Sidebar">
                <ul role="list" class="-mx-2 space-y-1">

                    <li id="khusus_saldo">
                       <div class="left_saldo">
                         <img src="@/assets/icon/wallet.png" id="logo_wallet">  

                         <div class="wrapper_spinner" v-if="user_wallet == null">
                            <Mini_spinner  ></Mini_spinner>
                         </div>
                        <p  v-else  id="fade-in">Rp {{user_wallet}}</p>

                       </div>
                       <div class="right_saldo text-gray-700 hover:text-lime-500 text-sm font-semibold leading-6">
                        <router-link :to="{ name: 'wallet' }">
                            Wallet
                        </router-link>
 

                       </div>
                    </li>

                    <li>
                        <router-link :to="{ name: 'detail_akun' }"
                            class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Detail
                            Akun</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'daftar_ahli_favorit' }"
                            class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Daftar
                            Ahli Favorit</router-link>
                    </li>
                    <!-- <li>
                        <router-link :to="{ name: 'wallet' }"
                            class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Riwayat Transaksi</router-link>
                    </li> -->
                    <li>
                        <router-link :to="{ name: 'pusat_bantuan' }"
                            class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Pusat
                            Bantuan</router-link>
                    </li>

                    <li>
                        <span @click="logout()" id="logout"
                            class="bg-red-50 text-red-600 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Keluar
                            Akun</span>
                    </li>
                </ul>
            </nav>

        </div>
    </div>

</template>

<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import { get_user_data } from '@/components/logic/API/user_service';
import Mini_spinner from '@/components/spinner/mini_spinner.vue';
// import { logout } from '@/components/logic/API/user';


export default {

    data() {
        return {
            user_id:"",
            user_wallet:null,
        }
    },
    components: {
        Mini_spinner
    },
    mounted() {
        this.get_user_saldo();
    },

    methods: {
        async logout() {
            const sessionStore = usetelecos_session_detailsStore();
            await sessionStore.cleartelecos_session_details();
            window.location.reload();
        },
        async get_user_saldo() {
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details(); 
            const res = await get_user_data(sessionDetails.userid)

            this.user_id = sessionDetails.userid
            this.user_wallet = res.user.wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },

}
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

#fade-in {
    animation: fadeIn 1s ease-out;
}

#logout {
    cursor: pointer;
}

li#khusus_saldo div.left_saldo img#logo_wallet{
    width: 30px;
    height: 30px;
}
li#khusus_saldo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    /* background-color: #f3f4f6; */
    margin-bottom: 10px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(4px);
    margin-bottom: 20px;

    user-select: none;
}

li#khusus_saldo div.left_saldo {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    /* background-color: #b4b4b4; */
    background-color: #f3f4f6;
    padding: 5px;
    min-width: 140px;
}

.wrapper_spinner{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
}
 
</style>