<template>
    <div class="min-h-screen bg-white">

        <Spinner v-if="!dataLoaded"></Spinner>

        <div v-else class="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
            <div class="menu">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="min-w-0 flex-1">
                        <h2
                            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Telecos Care</h2>
                    </div>
                    <div class="mt-4 flex md:ml-4 md:mt-0">
                        <RouterLink :to="{ name: 'lapor_telecos_care' }"
                            class="inline-flex items-center gap-x-1.5 rounded-md bg-lime-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <ion-icon name="add-circle" class="text-xl"></ion-icon>
                            Buat Laporan
                        </RouterLink>
                    </div>
                </div>
            </div>


            <!-- <div>
                {{ tiket[0] }}
            </div> -->


            <div class="list_list mt-3">
                <!-- <h6 class="mt-3 text-xs">Daftar Laporan yang di kirim : </h6> -->

                <ul role="list" class="divide-y divide-gray-100" v-for="(ticket, index) in tiket" :key="tiket"
                    v-if="tiket.length > 0">
                    <li class="flex items-center justify-between gap-x-6 py-5">
                        <div class="min-w-0">
                            <div class="flex items-start gap-x-3">
                                <p class="text-s font-semibold leading-6 text-gray-900">{{ ticket["name"] }}</p>

                            </div>
                            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <span
                                    class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{
                                        ticket["id"] }}</span>


                                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                                    <circle cx="1" cy="1" r="1" />
                                </svg>
                                <p class="whitespace-nowrap">Laporan dikirim pada {{ ticket["formattedDate"] }} </p>
                            </div>
                        </div>
                        <div class="flex flex-none items-center gap-x-4">
                            <router-link
                                :to="{ name: 'detail_laporan_telecos_care', params: { laporan_id: ticket['id'] } }"
                                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                                Lihat Laporan<span class="sr-only"></span>
                            </router-link>
                        </div>
                    </li>

                </ul>

                <div v-else>
                    <h6 class="mt-3 text-s">Tidak Ada Laporan</h6>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { get_laporan_all, get_laporan_by_userid } from '@/components/logic/API/pusat_bantuan';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import Spinner from '@/components/spinner/spinner.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { RouterLink } from 'vue-router';

export default {
    components: {
        Spinner
    },
    data() {
        return {
            user_id: "",
            response: "",
            tiket: [],
            dataLoaded: false
        }
    },
    mounted() {
        this.getuser();

    },
    methods: {
        processTickets(tickets) {
            return tickets.map(ticket => ({
                id: ticket.ticketId,
                name: ticket.ticketHeader,
                content: ticket.ticketContent,
                timestamp: ticket.timestamp,
                formattedDate: new Date(ticket.timestamp).toLocaleDateString(),
                href: '#'
            }));
        },

        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun', params: { param_1: 'redirect-telecos-care', param_2: 'redirect-telecos-care' } });
                }
                else {
                    this.user_id = sessionDetails.userid;
                    const hasil = await get_laporan_by_userid(sessionDetails.userid);
                    if (hasil.status === 1) {
                        this.tiket = this.processTickets(hasil.ticket);
                    }
                    this.dataLoaded = true;
                }
            } catch (error) {
                alert('Maaf, ada kesalahan pada sistem kami ', error);
                this.$router.push({ name: 'home' });
            }
        },


    },


}
</script>