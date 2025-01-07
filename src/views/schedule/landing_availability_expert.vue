<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="availability">
            <h1 class="text-m font-bold tracking-tight text-gray-900 sm:text-3xl">Atur Waktu Konsultasi</h1>
        </div>
        <Kalender_available_expert :expert-id="expertId"></Kalender_available_expert>
    </div>
</template>
<script>
import Kalender_available_expert from '@/components/kalender/kalender_available_expert.vue';
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session';

export default {
    components: {
        Kalender_available_expert
    },

    data() {
        return {
            expertId: null
        }
    },

    created() {
        this.try_get_session();
    },

    methods:{
        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();
                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun_expert' });
                    console.log('session not found');
                } else {
                    if (sessionDetails.phase == 1) {
                        this.expertId = sessionDetails.userid;
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            }
        },
    }
}
</script>
<style>
.availability{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.availability h1{
    margin-left: 10px;
    font-size: 25px;
    font-weight: 600;
}
.availability ion-icon{
    font-size: 35px;
    /* color: #4F46E5; */
}
</style>