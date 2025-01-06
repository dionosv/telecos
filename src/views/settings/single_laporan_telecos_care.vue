<template>
    <div class="min-h-screen bg-white">
        <Spinner v-if="!dataLoaded"></Spinner>        
        <div class="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8" v-if="dataLoaded && laporan.length > 0">
            <h1 id="judul_laporan">{{ laporan[0]["ticketHeader"] }}</h1>

            <div class="split">
                <span class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{ laporan[0]["ticketId"]}}</span>
                <h1 id="tanggal_laporan">{{ new Date(laporan[0]["timestamp"]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</h1>
            </div>
            <h3 id="isi_laporan">{{ laporan[0]["ticketContent"] }}</h3>
        </div>
    </div>
</template>
<script>
import { get_laporan_by_ticket_id } from '@/components/logic/API/pusat_bantuan';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        Spinner
    },

    created() {
        this.laporan_id = this.$route.params.laporan_id;
    },
    data() {
        return {
            laporan_id: "",
            laporan: [],
            dataLoaded: false
        }
    },
    mounted() {
        this.get_laporan_by_id();
        this.check_if_login();
    },
    methods: {

        async get_laporan_by_id() {
            const hasil = await get_laporan_by_ticket_id(this.laporan_id);
            if (hasil.status == 1) {
                this.laporan = hasil.ticket;
                this.dataLoaded = true;
            }
            else {
                this.$router.push({ name: 'home' });
            }

        },
        async check_if_login() {
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details();
            if (sessionDetails === false) {
                // kalau ga login reject aja harus login dulu
                this.$router.push({ name: 'akun', params: { param_1: 'redirect-laporan-telecos-care', param_2: this.laporan_id } });
            }
        }

    }


}
</script>
<style>

.split{
    display: flex;
    align-items: center;
    gap: 10px;
}

#judul_laporan{
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
}

#tanggal_laporan{
    font-size: 0.8rem;
    font-weight: 400;
    color: black;
}

#isi_laporan{
    margin-top: 20px;
    font-size: 0.8rem;
    font-weight: 400;
    color: black;
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