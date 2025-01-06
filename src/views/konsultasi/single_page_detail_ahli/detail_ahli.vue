<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="detail_ahli">

        <Spinner v-if="!data_load"></Spinner>

        <div class="wrapper_detail_ahli mx-auto" v-if="final_data">
            <div class="max-w-2xl  bg-white rounded-lg shadow-lg overflow-hidden" id="left_side" >

                <div class="set_middle" >
                    <div class="top_image">
                        <!-- <img src="/src/assets/doctor_temp/doctor.jpg" alt="Gambar Ahli"
                            class="w-40 h-40 rounded-full mx-auto"> -->

                            <img :src=data_ahli.imageName alt="Gambar Ahli"
                            class="w-40 h-40 rounded-full mx-auto">

                            <!-- <p>{{ data_ahli.imageName }}</p> -->
                    </div>

                    <div class="bottom_description" v-if="final_data">
                        <p class="text-center text-3xl font-bold text-gray-900">{{ data_ahli.name }}</p>
                        <p class="text-center sm:text-s lg:text-sm text-gray-500 pb-3">{{ data_ahli.description }}</p>
 
                        <div class="like_button">
                            <div class="already_liked" id="like" v-if="toogle_fav" @click="handle_unfav">
                                <span
                                    class="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-2 py-1 text-xs md:text-l font-medium text-red-700">
                                    <ion-icon name="heart"></ion-icon>
                                    Favorit
                                </span>
                            </div>
                            <div class="not_yet_liked" id="like" v-else @click="handle_fav">
                                <span
                                    class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-2 py-1 text-xs md:text-l font-medium text-gray-600">
                                    <ion-icon name="heart-outline"></ion-icon>
                                    Tambah Sebagai Favorit
                                </span>

                            </div>
                        </div>

                        <div class="menu_list">
                            <ion-icon name="bag-remove"></ion-icon>
                            <div class="detail_ahli">
                                <p id="atas">Pengalaman</p>
                                <p id="bawah">{{ new Date().getFullYear() - new Date(data_ahli.firstJob).getFullYear()
                                    }}
                                    tahun</p>
                            </div>
                        </div>

                        <div class="menu_list">
                            <img src="/src/assets/ahli_icon/garuda.png" alt="logo garuda" id="garuda">
                            <div class="detail_ahli">
                                <p id="atas">Nomor STR</p>
                                <p id="bawah">{{ data_ahli.strNum }}</p>

                            </div>
                        </div>

                        <div class="menu_list">
                            <ion-icon name="school"></ion-icon>
                            <div class="detail_ahli">
                                <p id="atas">Almamater</p>
                                <p id="bawah">{{ data_ahli.almamater }}</p>
                            </div>
                        </div>

                        <div class="menu_list">
                            <ion-icon name="location"></ion-icon>
                            <div class="detail_ahli">
                                <p id="atas">Lokasi Praktik</p>
                                <p id="bawah">{{ kota }}, {{ provinsi }}</p>
                            </div>
                        </div>
                    </div>
 
                    
                </div>


            </div>

            <div class="max-w-4xl  bg-white rounded-lg shadow-lg overflow-hidden" id="right_side">
                <Kalender_pesan_jadwal_ahli></Kalender_pesan_jadwal_ahli>
            </div>
        </div>
    </div>
</template>

<style scoped>
#detail_ahli {
    user-select: none;
}

.wrapper_detail_ahli {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35.5rem;
    margin-top: auto;
    margin-bottom: auto;
    gap: 20px;
    animation: flyIn 0.3s ease-in; /* Updated animation */

}

div.wrapper_detail_ahli div#left_side {
    width: 20rem;
    height: 100%;
}

div.wrapper_detail_ahli div#right_side {
    height: 100%;
}

.bottom_description {
    width: 100%;
    padding: 2rem;
    padding-top: 1rem;
}

.set_middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

div.set_middle div.bottom_description div.menu_list img#garuda {
    width: 24px;
    height: 24px;
}

div.bottom_description div.menu_list ion-icon {
    font-size: 1.5rem;
    /* Changed from 24px to 1.5rem */
}

@keyframes flyIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu_list {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
    gap: 10px;
}

div.set_middle div.bottom_description div.menu_list div.detail_ahli p#atas {
    font-weight: bold;
    font-size: 0.9rem;
}

div.set_middle div.bottom_description div.menu_list div.detail_ahli p#bawah {
    font-size: 0.77rem;
}

div.favkan {
    position: absolute;
    top: 10px;
    right: 10px;
}

div.set_middle div.favkan ion-icon {
    font-size: 25px;
    color: red;
    cursor: pointer;
}

#like{
    cursor: pointer;
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    div.wrapper_detail_ahli {
        flex-direction: column;
        gap: 10px;
        height: auto;
    }

    div.set_middle div.favkan ion-icon {
        font-size: 35px;
    }

    div.wrapper_detail_ahli div#left_side {
        width: 100%;
        height: 100%;
    }

    div.wrapper_detail_ahli div#right_side {
        width: 100%;
        height: 100%;
    }

    div.set_middle div.bottom_description div.menu_list div.detail_ahli p#atas {
        font-weight: bold;
        font-size: 1.1rem;
        /* Changed from 15px to 1rem */
    }

    div.set_middle div.bottom_description div.menu_list div.detail_ahli p#bawah {
        font-size: 0.8rem;
        /* Changed from 13px to 0.875rem */
    }


}
</style>
<script>
import Kalender_pesan_jadwal_ahli from '@/components/kalender/kalender_pesan_jadwal_ahli.vue';
import { get_experts_byID } from '@/components/logic/API/experts';
import { check_fav_by_userId_and_expertId, create_favourite, remove_favourite } from '@/components/logic/API/favourite';
import { expert_profile_picture } from '@/components/logic/API/image_processor';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        Spinner, Kalender_pesan_jadwal_ahli
    },
    data() {
        return {
            data_load: false,
            expertId: null,
            userId: null,
            expertDetail: null,
            data_ahli: {
                expertId: '',
                name: '',
                email: '',
                description: '',
                phoneNum: '',
                gender: '',
                dateOfBirth: '',
                firstJob: '',
                wallet: '',
                strNum: '',
                imageName: '',
                currentWorkspace: '',
                almamater: ''
            },
            final_data:false,

            toogle_fav: false,
            kota: '',
            provinsi: ''
        }
    },
   
    created() {
        always_scroll_on_top();
        this.check_if_login();
    },

    mounted() {
        this.expertId = this.$route.params.expertId;
        // this.getExpertDetail();
    },
    methods: {
        async getExpertDetail() {
            // console.log(this.data_load);
            if (this.data_load) {
                const hasil = await get_experts_byID(this.expertId);
                if (hasil.status === 1) {
                    this.expertDetail = hasil.user;
                    this.data_ahli = {
                        expertId: hasil.user.expertId,
                        name: hasil.user.name,
                        email: hasil.user.email,
                        description: hasil.user.description,
                        phoneNum: hasil.user.phoneNum,
                        gender: hasil.user.gender,
                        dateOfBirth: hasil.user.dateOfBirth,
                        firstJob: hasil.user.firstJob,
                        wallet: hasil.user.wallet,
                        strNum: hasil.user.strNum,
                        imageName: expert_profile_picture(hasil.user.imageName),
                        currentWorkspace: hasil.user.currentWorkspace,
                        almamater: hasil.user.almamater
                    };

                    this.final_data = true;

                    this.decode_kode_lokasi();
                }
                else {
                    this.$router.push({ name: 'home' });
                }
            }
        },
        async check_if_login() {
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details();
            // console.log(sessionDetails);
            if (sessionDetails === false) {
                // kalau ga login reject aja harus login dulu
                this.$router.push({ name: 'akun', params: { param_1: 'redirect-to-ahli', param_2: this.expertId } });
            }
            else {
                this.userId = sessionDetails.userid;
                this.check_fav_or_not();
                this.data_load = true;
                this.getExpertDetail(); 
                // console.log(this.data_load);
            }
        },
        async decode_kode_lokasi() {
            const kode_lokasi = this.data_ahli.currentWorkspace.split('.');
            const provinsi = kode_lokasi[0];
            // const kota = kode_lokasi[1];
            await this.get_nama_provinsi(provinsi);
            await this.get_data_kota(provinsi, this.data_ahli.currentWorkspace)
        },

        async get_data_kota(provinsi_code, full_code) {
            try {
                const response = await fetch(`../src/components/data_lokasi/lokasi/${provinsi_code}.json`); // Pastikan path benar
                const data = await response.json();
                const all_kota = data.data; // Assign fetched data to kotaData
                this.get_nama_kota(all_kota, full_code);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async get_nama_provinsi(kode_provinsi) {
            try {
                const response = await fetch(`../src/components/data_lokasi/provinsi.json`); // Pastikan path benar
                const data = await response.json();
                const all_kota = data.data; // Assign fetched data to kotaData 

                let x = 0;
                while (x < all_kota.length) {
                    if (all_kota[x].code == kode_provinsi) {
                        this.provinsi = all_kota[x].name;
                    }
                    x++;
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        get_nama_kota(data, full_code) {
            let x = 0;
            while (x < data.length) {
                if (data[x].code == full_code) {
                    this.kota = data[x].name;
                }
                x++;
            }
        },
        async check_fav_or_not(){ 
            const hasil = await check_fav_by_userId_and_expertId(this.userId, this.expertId);

            if(hasil.status ===1 ){
                this.toogle_fav = true;
            }
            else{
                this.toogle_fav = false;
            } 
        }, 

        async handle_unfav(){
            this.toogle_fav = false;
            await remove_favourite(this.userId, this.expertId);
        }, 

        async handle_fav(){
            this.toogle_fav = true;
            await create_favourite(this.userId, this.expertId);
        },


    }
}
</script>