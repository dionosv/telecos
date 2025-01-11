<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- <Kalender_2></Kalender_2> -->

        <!-- <kalender></kalender> -->


        {{userId}}
    </div>
</template>
<script>
import kalender from '@/components/kalender/kalender.vue'; 
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { get_session_by_user_Id } from '@/components/logic/API/session/session';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';

export default {
    mounted() { 
        always_scroll_on_top();
        this.try_get_session();
    },
    components: {
        kalender, 
    },
    data() {
        return {
            userId: '',
            session: {},
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
                        console.log("user id : "+this.userId);
                        await this.wrapper_get_session_by_user_Id();
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

        async wrapper_get_session_by_user_Id(){
            this.session = await get_session_by_user_Id(this.userId);
        },

        async get_session_by_id(){
            console.log(await get_session_by_user_Id(this.userId));
        }
        
    },


}
</script>
<style></style>