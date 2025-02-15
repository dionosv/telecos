<template>
    <div class="min-h-screen bg-white">
        <Spinner v-if="!dataLoaded"></Spinner>
        <div class="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8" v-if="dataLoaded && laporan.length > 0">
            <h1 id="judul_laporan">{{ laporan[0]["ticketHeader"] }}</h1>

            <div class="split">
                <span
                    class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{
                        laporan[0]["ticketId"]}}</span>
                <h1 id="tanggal_laporan">{{ new Date(laporan[0]["timestamp"]).toLocaleDateString('id-ID', {
                    day:
                        'numeric', month: 'long', year: 'numeric' }) }}</h1>
            </div>
            <h3 id="isi_laporan">{{ laporan[0]["ticketContent"] }}</h3>

            <div class="display_center">

                <button @click="handle_tc"
                    class="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                    Balas Telecos Care
                    <ion-icon name="mail" class="w-5 h-5"></ion-icon>
                </button>

            </div>

        </div>
    </div>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts_service';
import { get_laporan_by_ticket_id } from '@/components/logic/API/pusat_bantuan_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import { get_user_data } from '@/components/logic/API/user_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        Spinner,
    },

    created() {
        this.laporan_id = this.$route.params.laporan_id;
    },
    data() {
        return {
            laporan_id: "",
            laporan: [],
            dataLoaded: false, 
            email : ""
        }
    },
    mounted() {
        this.get_laporan_by_id();
        // this.check_if_login();
    },
    methods: {

        async get_laporan_by_id() {
            const hasil = await get_laporan_by_ticket_id(this.laporan_id);
            console.log(hasil.ticket[0].userId);
            if (hasil.status == 1) {
                this.laporan = hasil.ticket;
                this.dataLoaded = true;
                await this.coba_get_email();
            }
            else {
                this.$router.push({ name: 'home' });
            }

        },


        async coba_get_email(){ 
            const email_expert = await get_experts_byID(this.laporan[0].userId);
            const email_user = await get_user_data(this.laporan[0].userId);  

            if(email_expert.status === 1){
                this.email = email_expert.user.email
            }
            else if (email_user.status === 1){
                this.email = email_user.user.email
            }
        },

        async check_if_login() {
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details();
            if (sessionDetails === false) {
                // kalau ga login reject aja harus login dulu
                this.$router.push({ name: 'akun', params: { param_1: 'redirect-laporan-telecos-care', param_2: this.laporan_id } });
            }
        },

        handle_tc(){
            if (this.email) {
                window.location.href = `mailto:${this.email}?subject=Balasan Telecos Care : ${this.laporan[0].ticketHeader}`;
            }
        }

    }


}
</script>
<style>
.split {
    display: flex;
    align-items: center;
    gap: 10px;
}

#judul_laporan {
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
}

#tanggal_laporan {
    font-size: 0.8rem;
    font-weight: 400;
    color: black;
}

#isi_laporan {
    margin-top: 20px;
    font-size: 0.8rem;
    font-weight: 400;
    color: black;
}

.display_center{
    display: flex;
    justify-content: center;
    align-items: center;
}


@media (max-width: 768px) {
    .split {
        margin-top: 1rem;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    #judul_laporan {
        font-size: 1.25rem;
    }

    #isi_laporan {
        font-size: 0.9rem;
    }
}
</style>