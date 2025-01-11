<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- <Kalender_2></Kalender_2> -->

        <!-- <kalender></kalender> -->


        single lihat jadwal konsultasi

        {{session_id}}

        <!-- {{userId}} -->
    </div>
</template>
<script>
import kalender from '@/components/kalender/kalender.vue'; 
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { get_session_by_session_Id, get_session_by_user_Id } from '@/components/logic/API/session/session';
import { get_user_data } from '@/components/logic/API/user';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';

export default {
    mounted() { 
        always_scroll_on_top();
        this.try_get_session();
        this.get_session_by_id();
    },
    components: {
        kalender, 
    },
    data() {
        return {
            userId: '',
            session: {},
            session_id: this.$route.params.session_id,

            userdata:{
                name :''
            }
        }
    },
    methods: {

        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun' });
                } else {
                    if (sessionDetails.phase == 1) {
                        this.userId = sessionDetails.userid;

                        console.log(await get_user_data(this.userId)); 

                        await this.get_session_by_id();

                        // const data_user = await get_user_data(this.userId);
                        // this.user.name = data_user.user.name;
                        // this.user.wallet = data_user.user.wallet;
                        // this.validasi_loading_data.user_api = true;
                        // console.log(data_user);
                        // console.log("wallet : "+this.user.wallet)
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error); 
            } finally {
                this.isLoading = false;
            }
        }, 
        async get_session_by_id(){
            console.log(await get_session_by_session_Id(this.session_id));
        }
        
    },


}
</script>
<style></style>