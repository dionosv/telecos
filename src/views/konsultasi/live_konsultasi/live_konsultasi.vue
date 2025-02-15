<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="all_view_session" v-if="is_session === true">
            <div class="session" id="left">

                <div class="video_on_connected">


                    <div class="video">
                    <Spinner_no_full_screen></Spinner_no_full_screen>

                        <!-- <div class="not_connected">
                            anda tidak terkoneksi
                        </div> -->
                    </div>
                </div>

            </div>
            <div class="session" id="right">
                <div class="top_section">
                    <Spinner_no_full_screen></Spinner_no_full_screen>
                </div>
                <div class="video_desc">

                    <div class="atas">

                        <div class="image_dokter">
                            <img class="foto_ekspert" :src=human.expert_image_url alt="" loading="lazy">
                        </div>

                        <div class="dokter_detail">
                            <p id="nama">{{ human.expert }}</p>
                            <p id="jenis_ahli">{{ human.expert_type }}</p>
                        </div>

                        <div class="call_detail">
                            <!-- duration -->

                            <span class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                <span class="relative flex h-3 w-3">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                Terhubung
                            </span>
                        </div>
                    </div>

                    <div class="video_control">

                        <div class="mic" @click="handle_toogle_mic">
                            <ion-icon name="mic-outline" v-if="toogle.mic"></ion-icon>
                            <ion-icon name="mic-off-outline" v-else></ion-icon>
                        </div>

                        <div class="camera" @click="handle_toogle_camera">
                            <ion-icon name="videocam-outline" v-if="toogle.camera"></ion-icon>
                            <ion-icon name="videocam" v-else></ion-icon>
                        </div>

                        <div class="end_call">
                            <ion-icon name="call"></ion-icon>
                        </div>


                    </div>

                </div>
            </div>
        </div>

        <Spinner v-if="is_session === null"></Spinner>

        <div class="not_found" v-if="is_session === false">
            <ion-icon name="alert-circle"></ion-icon>
            <p class="s_query">Sesi tidak valid</p>

            <div class="split_bill">
                <router-link :to="{ name: 'daftar_ahli_konsultasi' }"
                    class="rounded-md bg-lime-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">Buat
                    Sesi Konsultasi</router-link>
                <router-link :to="{ name: 'telecos_care' }"
                    class="rounded-md bg-gray-950 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                    Telecos Care</router-link>
            </div>
        </div>


        <!-- {{userId}} -->
    </div>
</template>
<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import { get_session_by_session_Id } from '@/components/logic/API/session/session_service';
import { get_experts_byID } from '@/components/logic/API/experts_service';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import { get_user_data } from '@/components/logic/API/user_service';
import Spinner from '@/components/spinner/spinner.vue';
import { expert_profile_picture } from '@/components/logic/API/image_processor_service';
import Spinner_no_full_screen from '@/components/spinner/spinner_no_full_screen.vue';

export default {
    mounted() {
        always_scroll_on_top();
        this.try_get_session();
        // this.get_session_by_id();
    },
    components: {
        Spinner,
        Spinner_no_full_screen
    },
    data() {
        return {
            userId: '',


            session_name: "",
            session_status: "",

            session_start: "",
            session_end: "",

            koneksi : null,

            session_id: this.$route.params.session_id,
            toogle: {
                camera: false,
                mic: true
            },
            is_session: null,
            human: {
                user: '',
                user_id: "",
                expert: "",
                expert_type: "",
                expert_id: "",
                expert_image_url: ""
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
                        if (await this.validasi_all(await this.get_session_by_id())) {
                            await this.get_expert_details();
                            await this.handle_get_user_data();
                            this.is_session = true;
                            console.log("boleh")
                        }
                        else {
                            this.is_session = false;
                            console.log("tidak boleh")
                        }

                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async get_session_by_id() {
            const ses_id = await get_session_by_session_Id(this.session_id);
            if (ses_id.status === 1) {
                this.session_name = ses_id.session[0].sessionName
                this.human.expert_id = ses_id.session[0].expertId
                this.session_start = ses_id.session[0].date
                this.session_end = ses_id.session[0].endDate
                this.human.user_id = ses_id.session[0].userId
                this.session_status = ses_id.session[0].status
                // this.is_session = true;
                return true
            }
            else {
                return false
                // this.is_session = false;
            }
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

        async validasi_all(session_id_status) {
            // cek kalo session ada ??
            if (session_id_status) {
                if (this.session_status === "pending") {
                    if (this.userId === this.human.user_id) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        },
        handle_toogle_camera() {
            this.toogle.camera = !this.toogle.camera;
        },

        handle_toogle_mic() {
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

.session#left {
    width: 75%;
}

.session#right {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
}

.video {
    width: 100%;
    height: 33.75rem; /* 16:9 aspect ratio based on a width of 60rem */
    background-color:black;
    border-radius: 0.5rem;
}

.video_desc .atas {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    padding: 1rem;
}

div.video_desc div.atas div.image_dokter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

div.video_desc div.atas div.image_dokter img.foto_ekspert {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
}

div.video_desc div.atas div.dokter_detail p#nama {
    font-weight: bold;
    font-size: 1.6rem;
    text-align: center;
}

div.video_desc div.atas div.dokter_detail p#jenis_ahli {
    font-size: 1rem;
    text-align: center;
}


.top_section {
    width: 100%;
    height: 11.25rem; /* 16:9 aspect ratio for a typical width */
    background-color: black;
    border-radius: 0.5rem;
    position: relative;
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

.video_control {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-evenly;
}


.not_found {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 200px;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
}

.not_found .split_bill {
    display: flex;
    gap: 1rem;
}

.not_found ion-icon {
    font-size: 3rem;
    color: #666;
}

.not_found .s_query {
    font-size: 1.25rem;
    color: #666;
    max-width: 100%;
    word-wrap: break-word;
}

@media screen and (max-width: 768px) {
    .not_found {
        min-height: 150px;
        padding: 1.5rem;
    }

    .not_found ion-icon {
        font-size: 2.5rem;
    }

    .not_found .s_query {
        font-size: 1rem;
        padding: 0 1rem;
        line-height: 1.5;
    }
}

@media screen and (max-width: 480px) {
    .not_found {
        min-height: 120px;
        padding: 1rem;
    }

    .not_found ion-icon {
        font-size: 2rem;
    }

    .not_found .s_query {
        font-size: 0.875rem;
    }
}

/* Add these media queries at the bottom of the style section */
@media screen and (max-width: 768px) {
    .all_view_session {
        flex-direction: column;
    }

    .session#left,
    .session#right {
        width: 100%;
    }

    .video_desc .atas {
        padding: 0.5rem;
        padding-top: 3rem;
        padding-bottom: 3rem;

    }

    div.video_desc div.atas div.image_dokter img.foto_ekspert {
        width: 4rem;
        height: 4rem;
    }

    div.video_desc div.atas div.dokter_detail p#nama {
        font-size: 1.2rem;
    }

    div.video_desc div.atas div.dokter_detail p#jenis_ahli {
        font-size: 0.875rem;
    }

    .video_control {
        padding: 0.5rem 0;
    }

    .end_call,
    .camera,
    .mic {
        width: 2.5rem;
        height: 2.5rem;
    }

    .end_call ion-icon,
    .camera ion-icon,
    .mic ion-icon {
        font-size: 1.5rem;
    }

    .session#right {
        width: 100%;
        min-height: auto;
        margin-top: 1rem;
        padding: 0.75rem;
    }

    .top_section {
        padding-top: 40%; /* Reduced height ratio for mobile */
    }

    .video_desc {
        margin-top: 0.5rem;
    }

    .video_desc .atas {
        flex-direction: row;
        justify-content: flex-start;
        padding: 0.5rem;
        gap: 0.75rem;
    }

    div.video_desc div.atas div.dokter_detail {
        flex: 1;
        text-align: left;
    }

    div.video_desc div.atas div.dokter_detail p#nama {
        text-align: left;
        /* margin-bottom: 0.25rem; */
    }

    div.video_desc div.atas div.dokter_detail p#jenis_ahli {
        text-align: left;
    }

    .call_detail {
        position: static; /* Changed from absolute */
    }

    .call_detail span {
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
    }

    .call_detail span .relative {
        display: none;
    } 
}

@media screen and (max-width: 480px) {
    .session#right {
        padding: 0.5rem;
    }

    .video_desc .atas {
        padding: 0.25rem;
        padding-top: 0.7rem;
        padding-bottom: 0.7rem; 
        gap: 0.5rem;
    }

    .call_detail span {
        font-size: 0.65rem;
        padding: 0.2rem 0.4rem;
    }
}

/* Add iPad/tablet specific styles */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .session#left {
        width: 65%;
    }

    .session#right {
        width: 35%;
    }

    div.video_desc div.atas div.image_dokter img.foto_ekspert {
        width: 5rem;
        height: 5rem;
    }

    div.video_desc div.atas div.dokter_detail p#nama {
        font-size: 1.3rem;
    }

    div.video_desc div.atas div.dokter_detail p#jenis_ahli {
        font-size: 0.9rem;
    }

    .end_call,
    .camera,
    .mic {
        width: 2.75rem;
        height: 2.75rem;
    }

    .end_call ion-icon,
    .camera ion-icon,
    .mic ion-icon {
        font-size: 1.75rem;
    }

    .video_desc .atas {
        padding: 0.75rem;
    }
}
</style>