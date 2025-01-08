<template>
    <div id="all" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- buat pesanan baru

        <p>Schedule ID: {{ $route.params.schedule_id }}</p>
        <p>Expert ID: {{ $route.params.expert_id }}</p>
        <p>User ID: {{ userId }}</p> -->


        <div class="wrapper_pesanan_baru">
            <!-- <div class="set_middle">
                <div class="top_image">
                    <img :src=data_ahli.imageName alt="Gambar Ahli" class="w-40 h-40 rounded-full mx-auto">
                </div>

                <div class="bottom_description" v-if="final_data">
                    <p class="text-center text-3xl font-bold text-gray-900">{{ data_ahli.name }}</p>
                    <p class="text-center sm:text-s lg:text-sm text-gray-500 pb-3">{{ data_ahli.description }}</p>

                     

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


            </div> -->
            <div class="left_side">
                <Logo_aja></Logo_aja>
                <div class="wrap_left_side">
                    <ion-icon name="lock-closed"></ion-icon>
                    <p>Booking Systems</p>
                </div>


            </div>
            <div class="right_side">

                <div class="header">
                    <p>Detail Pesan Sesi Konsultasi</p>
                </div>

                <div class="detail">
                    <p>Konsultasi dengan {{ data_ahli.description }} {{ data_ahli.name }}</p>
                    <p>Konsultasi akan di lakukan pada {{ meeting.meetingDate }}</p>
                    <p>Konsultasi akan di lakukan pada pukul {{ meeting.startHour }} - {{ meeting.endHour }}</p>

                    <p>Tarif Konsultasi Rp {{ meeting.price }}</p>
                    <!-- <p>{{ data_ahli }}</p> -->
                    <p>Sesi Konsultasi ini dipesan oleh {{ user.name }}</p>
                </div>

                <div class="detail_tombol">
                    <button type="button" @click="handle_button_batal"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">

                        <ion-icon name="close-circle"></ion-icon>
                        Batalkan
                    </button>
                    <button type="button" @click="handle_button_konfirmasi"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        <!-- <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" /> -->
                        <ion-icon name="checkmark-circle"></ion-icon>
                        Konfirmasi
                    </button>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts';
import { check_fav_by_userId_and_expertId } from '@/components/logic/API/favourite';
import { expert_profile_picture } from '@/components/logic/API/image_processor';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import provinsiData from '@/components/data_lokasi/provinsi.json';
import Logo_aja from '@/components/logo/logo_aja.vue';
import { get_user_data } from '@/components/logic/API/user';
import { get_schedule_by_schedule_id } from '@/components/logic/API/schedule/schedule';

export default {
    components: {
        Logo_aja
    },
    mounted() {
        this.try_get_session();
        this.check_fav_or_not();
        this.data_load = true;
        this.getExpertDetail();
        this.get_schedule_detail();
    },
    data() {
        return {
            scheduleId: this.$route.params.schedule_id,
            expertId: this.$route.params.expert_id,
            userId: "",

            meeting: {
                meetingDate: '',
                startHour: '',
                endDate: '',
                endHour: '',
                price: ''
            },

            user: {
                name: '',
                email: '',
                phoneNum: ''
            },

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

            toogle_fav: false,
            final_data: false,
            kota: '',
            provinsi: ''
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
                        const data_user = await get_user_data(this.userId);
                        this.user.name = data_user.user.name;
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }
        },

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

        async get_schedule_detail() {
            const cek_jadwal = await get_schedule_by_schedule_id(this.scheduleId);
            if (cek_jadwal.status === 1) {
                let startTime = new Date(cek_jadwal.schedules[0].dateStart);
                let endTime = new Date(cek_jadwal.schedules[0].dateEnd);
                this.meeting.price = cek_jadwal.schedules[0].rate;
                this.meeting.startHour = startTime.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                this.meeting.endHour = endTime.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
                this.meeting.endDate = endTime; 
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                const dayName = dayNames[startTime.getDay()];
                const formattedDate = startTime.toLocaleDateString('id-ID', options);
                this.meeting.meetingDate = `${dayName}, ${formattedDate}`;
                console.log(this.meeting)
            }
            // console.log(cek_jadwal)
        },


        async decode_kode_lokasi() {
            const kode_lokasi = this.data_ahli.currentWorkspace.split('.');
            const provinsi = kode_lokasi[0];
            await this.get_nama_provinsi(provinsi);
            await this.get_data_kota(provinsi, this.data_ahli.currentWorkspace);
        },

        async get_data_kota(provinsi_code, full_code) {
            try {
                const cityModule = await import(`@/components/data_lokasi/lokasi/${provinsi_code}.json`);
                const all_kota = cityModule.data;
                this.get_nama_kota(all_kota, full_code);
            } catch (error) {
                console.error('Error loading city data:', error);
                this.kota = 'Data tidak tersedia';
            }
        },

        async get_nama_provinsi(kode_provinsi) {
            try {
                const all_provinsi = provinsiData.data;
                const provinsi = all_provinsi.find(p => p.code === kode_provinsi);
                this.provinsi = provinsi ? provinsi.name : 'Provinsi tidak ditemukan';
            } catch (error) {
                console.error('Error getting province name:', error);
                this.provinsi = 'Data tidak tersedia';
            }
        },

        get_nama_kota(data, full_code) {
            const kota = data.find(k => k.code === full_code);
            this.kota = kota ? kota.name : 'Kota tidak ditemukan';
        },

        async check_fav_or_not() {
            const hasil = await check_fav_by_userId_and_expertId(this.userId, this.expertId);

            if (hasil.status === 1) {
                this.toogle_fav = true;
            }
            else {
                this.toogle_fav = false;
            }
        },

        async handle_button_batal() {
            this.$router.back();
        },

        async handle_button_konfirmasi() {
            console.log("ok")
        }
    },
}
</script>
<style scoped>
.wrapper_pesanan_baru {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35.5rem;
    margin-top: auto;
    margin-bottom: auto;
    gap: 30px;
    animation: flyIn 0.3s ease-in;
}

.wrap_left_side {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
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

div.detail_tombol {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 45px;
    margin-bottom: 5px;
    gap: 10px;
}

div.detail_tombol button ion-icon.md.hydrated {
    font-size: 1.2rem;
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

#like {
    cursor: pointer;
    display: flex;
    justify-content: center;
}

.right_side {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    width: 500px;
}

.right_side .header {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.right_side .header p {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.right_side .detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.right_side .detail p {
    color: #4b5563;
    font-size: 0.95rem;
}

@media (max-width: 768px) {
    .right_side {
        width: 100%;
        margin: 10px;
    }
}

@media (max-width: 768px) {
    div.wrapper_pesanan_baru {
        flex-direction: column;
        gap: 10px;
        height: auto;
    }

    .right_side {
        width: 100%;
    }

    div.set_middle div.bottom_description div.menu_list div.detail_ahli p#atas {
        font-weight: bold;
        font-size: 1.1rem;
    }

    div.set_middle div.bottom_description div.menu_list div.detail_ahli p#bawah {
        font-size: 0.8rem;
    }
}
</style>