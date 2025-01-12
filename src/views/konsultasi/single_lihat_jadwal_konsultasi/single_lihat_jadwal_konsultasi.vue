<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- <Kalender_2></Kalender_2> -->

        <!-- <kalender></kalender> -->


        <!-- single lihat jadwal konsultasi

        {{session_id}} -->

        <div class="all_view_session">
            <div class="session" id="left">

                <div class="video_on_connected">


                    <div class="video">


                    </div>

                     

                </div>

            </div>
            <div class="session" id="right">
                <div class="top_section">

                </div>
                <div class="video_desc">

                    <div class="atas">

                        <div class="image_dokter">

                        </div>

                        <div class="dokter_detail">
                            <p id="nama">Budi didid</p>
                            <p id="jenis_ahli">Dokter spesialis</p>
                        </div>

                        <div class="call_detail">
                            duration
                        </div>


 

                    </div>

                    <div class="video_control">

                        <div class="mic" @click="handle_toogle_mic">
                            <ion-icon name="mic-outline" v-if="toogle.mic"></ion-icon>
                            <ion-icon name="mic-off-outline" v-else></ion-icon>
                        </div>
                        
                        <div class="camera" @click="handle_toogle_camera">
                            <ion-icon name="videocam-outline" v-if="toogle.camera"></ion-icon>
                            <ion-icon name="videocam"v-else></ion-icon>
                        </div>

                        <div class="end_call">
                            <ion-icon name="call"></ion-icon>
                        </div>


                    </div>

                </div>
            </div>

        </div>

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
            toogle:{
                camera:false,
                mic:true
            },

            human: {
                user: '',
                expert : "",
                jenis_expert: "",
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
        async get_session_by_id() {
            console.log(await get_session_by_session_Id(this.session_id));
        },
        handle_toogle_camera(){
            this.toogle.camera = !this.toogle.camera;
        },

        handle_toogle_mic(){
            this.toogle.mic = !this.toogle.mic;
        }

    },


}
</script>
<style scoped>
.all_view_session {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.session {
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);
    background-color: white;
}

.session#left{
    width: 75%;
}

.session#right{
    width: 25%;
}

.video{
    width: 100%;
    padding-top: 56.25%; 
    position: relative;
    background-color: rgb(139, 139, 139);
    border-radius: 0.5rem;
}

.top_section {
    width: 100%;
    position: relative;
    padding-top: 56.25%; /* This creates 16:9 aspect ratio */
    background-color: rgb(139, 139, 139);
    border-radius: 0.5rem;
}

.end_call{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: red;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;


    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.end_call ion-icon{
    font-size: 2rem;
    color: white;
}

.camera{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: white;
    
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);

    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%; 
}
.camera ion-icon{
    font-size: 2rem;
    color: black;
}

.mic{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: white;
    
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 10px 15px -3px rgba(0, 0, 0, 0.05);

    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%; 
}
.mic ion-icon{
    font-size: 2rem;
    color: black;
}

.video_control{
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-evenly;
}
</style>