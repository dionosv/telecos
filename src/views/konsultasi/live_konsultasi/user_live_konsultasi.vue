<template>

    <div class="mx-auto mt-0 max-w-7xl px-4 sm:px-6 lg:px-8" id="all"> 
        <div class="top">
            <div class="sesi" v-if="is_session">
                <iframe 
                                :src=formattedLink
                                allow="camera *; microphone *; display-capture *; autoplay *; clipboard-read *; clipboard-write *; fullscreen *"
                                style="width: 100%; height: 100%; border: none;"
                                allowfullscreen
                            ></iframe>

            </div>
            <Spinner_no_full_screen id="spin" v-else></Spinner_no_full_screen>
        </div>

        <div class="control">

            <div class="vidcal_title">
                <div class="image_dokter">
                    <img class="foto_ekspert" :src=human.expert_image_url alt="" loading="lazy">
                </div>

                <div class="split_dokter">
                    <div class="nama_dokter">
                        <h1>{{human.expert}}</h1>
                    </div>
                    <div class="tipe_dokter">
                        <h1>{{human.expert_type}}</h1>
                    </div>
                </div>
            </div>

            <div class="video_control"> 

                <span class="time-display flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                <span class="relative flex h-3 w-3">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                {{ formattedTime }}
                            </span>


                <div class="end_call" @click="handle_disconnect">
                    <ion-icon name="call"></ion-icon>
                </div>


            </div>

        </div>

    </div>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts';
import { expert_profile_picture } from '@/components/logic/API/image_processor';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { get_session_by_session_Id } from '@/components/logic/API/session/session';
import { get_user_data } from '@/components/logic/API/user';
import Spinner_no_full_screen from '@/components/spinner/spinner_no_full_screen.vue';

export default {
    components: {
        Spinner_no_full_screen
    },
    mounted() {
        this.try_get_session();
        this.startTimer();
    },
    data() {
        return {

            is_session: false,
            toogle: {
                mic: true,
                camera: true
            },
            human: {
                user: '',
                user_id: "",
                expert: "",
                expert_type: "",
                expert_id: "",
                expert_image_url: ""
            },
            userId: '',
            session_name: "",
            session_status: "",
            session_start: "",
            session_end: "",
            formattedLink: null,
            session_id: this.$route.params.session_id,
            seconds: 0,
            timerInterval: null,
            cameraStream: null
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.seconds / 60);
            const remainingSeconds = this.seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    },
    methods: {

        async get_session_by_id() {
            const ses_id = await get_session_by_session_Id(this.session_id);
            if (ses_id.status === 1) {
                this.session_name = ses_id.session[0].sessionName
                this.human.expert_id = ses_id.session[0].expertId
                this.session_start = ses_id.session[0].date
                this.session_end = ses_id.session[0].endDate
                this.human.user_id = ses_id.session[0].userId
                this.session_status = ses_id.session[0].status
                return true
            }
            else {
                return false
            }
        },

        async requestCameraPermission() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true,
                    audio: true 
                });
                this.permissionGranted = true;
                // Stop the stream immediately after getting permission
                stream.getTracks().forEach(track => track.stop());
                console.log('Camera and microphone permission granted');
            } catch (err) {
                this.permissionGranted = false;
                console.error('Error accessing camera and microphone:', err);
                alert('Mohon izinkan akses kamera dan mikrofon untuk menggunakan fitur ini');
                // alert('Please allow camera and microphone access to use this feature');
            }
        },

        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun' });
                } else {
                    if (sessionDetails.phase == 1) {
                        this.userId = sessionDetails.userid;
                        await this.get_session_by_id()
                        await this.get_expert_details();
                        await this.handle_get_user_data();
                        this.formatting_link();
                        this.is_session = true;
                        console.log("boleh")
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }

        },

        formatting_link(){
            this.formattedLink = `https://claudio.codes/telecos-be/room/${this.session_id}/usr=${this.human.user_id}`;
        },

        async get_expert_details() {
            const ekspert = await get_experts_byID(this.human.expert_id);
            this.human.expert_type = ekspert.user.description
            this.human.expert_image_url = expert_profile_picture(ekspert.user.imageName)
            this.human.expert = ekspert.user.name
        },

        async handle_get_user_data() {
            const data_user = await get_user_data(this.userId);
            this.human.user = data_user.user.name;
        },

        handle_toogle_camera() {
            this.toogle.camera = !this.toogle.camera;
            if (this.toogle.camera) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        this.cameraStream = stream;
                        console.log('Camera turned on');
                    })
                    .catch(err => {
                        console.error('Error turning on camera:', err);
                    });
            } else {
                if (this.cameraStream) {
                    this.cameraStream.getTracks().forEach(track => track.stop());
                    this.cameraStream = null;
                    console.log('Camera turned off');
                }
            }
        },

        handle_toogle_mic() {
            this.toogle.mic = !this.toogle.mic;
        },

        handle_disconnect(){
            this.$router.back();
        },
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.seconds++;
            }, 1000);
        }
    },
    beforeUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}
</script>
<style>

.status {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem; 
}
#spin {
    background-color: black;
}

.top {
    /* background-color: #959595; */
    height: 75vh;
    width: 100%;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.sesi {
    width: 100%;
    height: 100%;
}

.end_call {
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

.end_call ion-icon {
    font-size: 2rem;
    color: white;
}

.camera {
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

.camera ion-icon {
    font-size: 2rem;
    color: black;
}

.mic {
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

.mic ion-icon {
    font-size: 2rem;
    color: black;
}

.control{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 2rem;
    margin-right: 2rem;
}

.video_control {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

img.foto_ekspert {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
}

.vidcal_title{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    gap: 0.5rem;
}

 div.vidcal_title div.split_dokter div.nama_dokter h1{
    font-size: 1.1rem;
    font-weight: bold;
 }
 
div.control div.vidcal_title div.split_dokter div.tipe_dokter h1{
    font-size: 0.7rem;
}

.time-display {
    height: 2rem; /* Adjust the height as needed */
    display: flex;
    align-items: center;
}

@media screen and (max-width: 768px) {

    .control{
        margin: 0px;
    }

}

</style>