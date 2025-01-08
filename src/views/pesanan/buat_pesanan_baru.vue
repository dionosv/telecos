<template>
    <div id="all" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- buat pesanan baru

        <p>Schedule ID: {{ $route.params.schedule_id }}</p>
        <p>Expert ID: {{ $route.params.expert_id }}</p>
        <p>User ID: {{ userId }}</p> -->

        <Spinner v-if="final_validasi === null"></Spinner>
        <div class="wrapper_pesanan_baru" v-if="final_validasi === true">
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

            <div class="wrapper_mid_side" v-show="slide === 1">


                <div class="mid_side">

                    <div class="summary">
                        <div class="summary_item">
                            <ion-icon name="person"></ion-icon>
                            <div class="text">
                                <p class="label">Konsultasi dengan</p>
                                <p class="value">{{ data_ahli.description }} {{ data_ahli.name }}</p>
                            </div>
                        </div>

                        <div class="summary_item">
                            <ion-icon name="calendar"></ion-icon>
                            <div class="text">
                                <p class="label">Jadwal</p>
                                <p class="value">{{ meeting.meetingDate }}</p>
                                <p class="value">{{ meeting.startHour }} - {{ meeting.endHour }}</p>
                            </div>
                        </div>

                        <div class="summary_item">
                            <ion-icon name="wallet"></ion-icon>
                            <div class="text">
                                <p class="label">Biaya</p>
                                <p class="value">Rp {{ meeting.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="action_buttons">
                    <button type="button" @click="handle_button_batal"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        <ion-icon name="close-circle"></ion-icon>
                        Batalkan
                    </button>
                    <button type="button" @click="handle_button_konfirmasi"
                        class="inline-flex items-center gap-x-1.5 rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        <ion-icon name="checkmark-circle"></ion-icon>
                        Konfirmasi
                    </button>
                </div>

            </div>

            <div class="wrapper_end_side" v-show="slide === 2">


                <div class="end_side">

                    <div class="header_1">

                        <Logo_aja></Logo_aja>
                        <!-- <p>Detail Pesan Sesi Konsultasi</p> -->
                        <!-- <Logo_aja></Logo_aja> -->

                        <div class="tanggal">

                            <p>
                                {{ current_date }}
                            </p>

                            <p>
                                {{ current_time }}

                            </p>

                        </div>

                    </div>

                    <div class="detail">

                        <div class="split_1">
                            <p>Konsultasi {{ data_ahli.description }}</p>
                            <p> Rp {{ meeting.price }}</p>
                        </div>

                        <div class="split_1">
                            <p>Metode Pembayaran</p>
                            <p>Wallet</p>
                        </div>
                    </div>

                    <p>Transaksi Berhasil</p>
                    <p>Transaksi ini diterbitkan atas nama {{ user.name }}</p>

                </div>



            </div>
        </div>

        <div class="wrapper_pesanan_salah" v-if="final_validasi === false">

            <main class="flex w-full max-w-7xl flex-auto flex-col justify-center py-24 sm:py-64">
                <p class="text-base font-semibold leading-8 text-lime-600">Mohon maaf, </p>
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pesanan Invalid</h1>
                <p class="mt-6 text-base leading-7 text-gray-600">Silahkan ulangi kembali untuk melakukan pesanan ulang
                </p>

                <!-- <div class="mt-10">
                <router-link :to="{ name: 'lihat_artikel_saya_expert' }" class="text-sm font-semibold leading-7 text-lime-600">
                    Kembali ke artikel saya
                </router-link>
            </div> -->

            </main>
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
import Spinner from '@/components/spinner/spinner.vue';
import { kurangi_saldo } from '@/components/logic/API/saldo/saldo';

export default {
    components: {
        Logo_aja,
        Spinner
    },
    watch: {

        validasi_loading_data: {
            deep: true,
            handler(newVal) {
                this.validateAllData();
            }
        }

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
            current_date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            current_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
            meeting: {
                meetingDate: '',
                startHour: '',
                endDate: '',
                endHour: '',
                price: ''
            },
            slide: 1,

            user: {
                name: '',
                email: '',
                phoneNum: '',
                wallet: 0
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

            final_validasi: null,
            validasi_loading_data: {
                user_api: null,
                expert_api: null,
                schedule_api: null
            },

            toogle_fav: false,
            final_data: false,
            kota: '',
            provinsi: '',
            timer: null
        }
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.current_time = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
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
                        const data_user = await get_user_data(this.userId);
                        this.user.name = data_user.user.name;
                        this.user.wallet = data_user.user.wallet;
                        this.validasi_loading_data.user_api = true;
                        console.log(data_user);

                        // console.log("wallet : "+this.user.wallet)
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
                this.validasi_loading_data.user_api = false;
            } finally {
                this.isLoading = false;
            }
        },

        async getExpertDetail() {
            try {
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
                    this.validasi_loading_data.expert_api = true;
                }
            } catch (error) {
                console.error('Failed to load expert details:', error);
                this.validasi_loading_data.expert_api = false;
            }
        },

        async get_schedule_detail() {
            try {
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
                    this.validasi_loading_data.schedule_api = true;
                    // console.log(this.meeting)
                }
                // console.log(cek_jadwal)
            } catch (error) {
                console.error('Failed to load schedule details:', error);
                this.validasi_loading_data.schedule_api = false;
            }
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


        async check_saldo() {
            if (this.user.wallet < this.meeting.price) {
                // console.log("Saldo anda tidak mencukupi")
                return false;
            }
            else {
                // console.log("Saldo mencukupi")
                return true
            }
        },

        async proses_kurangi_saldo() {
            await console.log(kurangi_saldo(this.userId, this.meeting.price));

        },

        async handle_button_konfirmasi() {
            if (await this.check_saldo()) {
                await this.updateTime();
                await this.proses_kurangi_saldo();
                this.slide = 2;

            }
            else{
                console.log("Saldo anda tidak mencukupi")
        }

    },

    validateAllData() {
        // Wait a small delay to ensure all async operations are complete
        setTimeout(() => {
            const { user_api, expert_api, schedule_api } = this.validasi_loading_data;

            // Only update final_validasi if we have a complete set of responses
            if (user_api !== null && expert_api !== null && schedule_api !== null) {
                this.final_validasi = user_api && expert_api && schedule_api;
            }
            else {
                this.final_validasi = false;
            }
        }, 500);
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

    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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

.mid_side {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.mid_side .header {
    text-align: center;
    margin-bottom: 20px;
}

.mid_side .header p {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
}

.mid_side .summary {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.summary_item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px;
    background-color: #f9fafb;
    border-radius: 6px;
}

.summary_item ion-icon {
    font-size: 1.5rem;
    color: #84cc16;
    margin-top: 2px;
}

.summary_item .text {
    flex: 1;
}

.summary_item .label {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 2px;
}

.summary_item .value {
    font-size: 0.95rem;
    color: #111827;
    font-weight: 500;
}

@media (max-width: 768px) {
    .mid_side {
        width: 100%;
        max-width: 300px;
        margin: 10px auto;
    }
}

.end_side {
    background-color: white;
    width: 360px;
    padding: 20px 15px;
    font-family: 'Courier New', monospace;
    position: relative;
    min-height: 400px;
    border: 1px solid #ddd;
}

.end_side::before,
.end_side::after {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    height: 5px;
    background: repeating-linear-gradient(90deg,
            #fff 0px,
            #fff 4px,
            transparent 4px,
            transparent 8px);
}

.end_side::before {
    top: -5px;
}

.end_side::after {
    bottom: -5px;
}

.end_side .header_1 {
    text-align: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px dashed #000;
}

.end_side .tanggal {
    margin-top: 15px;
    font-size: 0.8rem;
    color: #333;
    /* text-align: right; */

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.end_side .detail {
    padding: 10px 0;
    border-bottom: 1px dashed #000;
}

.end_side .split_1 {
    padding: 8px 0;
    font-size: 0.85rem;
    color: #000;
    display: flex;
    justify-content: space-between;
    line-height: 1.4;
}

.end_side .split_1 p:last-child {
    font-weight: bold;
}

.end_side .detail_tombol {
    margin-top: 20px;
    padding-top: 15px;
    text-align: center;
}

.end_side>p {
    margin-top: 15px;
    font-size: 0.8rem;
    text-align: center;
    color: #666;
    font-style: italic;
}

.action_buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    width: 300px;
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

@media (max-width: 768px) {
    .action_buttons {
        width: 100%;
        max-width: 300px;
        margin: 20px auto;
    }

    .mid_side {
        width: 100%;
        max-width: 100%;
        margin: 10px auto;
    }

    .end_side {
        width: 100%;
        max-width: 100%;
        margin: 10px auto;
    }

    .wrapper_pesanan_baru {
        display: flex;
        flex-direction: column;
    }

    .left_side {
        display: none;
    }
}
</style>