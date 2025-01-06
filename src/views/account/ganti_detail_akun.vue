<template>
    <div class="min-h-screen bg-white">
        <Spinner v-if="!dataLoaded"></Spinner>

        <div v-show="dataLoaded" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 fade-in">
            <div class="mx-auto max-w-3xl">
                <div>
                    <div class="notification_success">
                        <div aria-live="assertive"
                            class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
                            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                                <transition enter-active-class="transform ease-out duration-300 transition"
                                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                                    <div v-if="save_success"
                                        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div class="p-4">
                                            <div class="flex items-start">
                                                <div class="flex-shrink-0">
                                                    <ion-icon name="checkmark-circle"
                                                        class="text-2xl mb-0 text-green-400"></ion-icon>
                                                </div>
                                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                                    <p class="text-sm font-medium text-gray-900">Perubahan disimpan</p>
                                                    <p class="mt-1 text-sm text-gray-500">Perubahan profil berhasil di
                                                        simpan</p>
                                                </div>
                                                <div class="ml-4 flex flex-shrink-0">
                                                    <button type="button" @click="save_success = false"
                                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span class="sr-only">Close</span>
                                                        <ion-icon name="close" class="h-5 w-5"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="notification_error">
                        <div aria-live="assertive"
                            class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
                            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                                <transition enter-active-class="transform ease-out duration-300 transition"
                                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                                    <div v-if="save_error"
                                        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div class="p-4">
                                            <div class="flex items-start">
                                                <div class="flex-shrink-0">
                                                    <ion-icon name="close-circle"
                                                        class="text-2xl mb-0 text-red-400"></ion-icon>

                                                </div>
                                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                                    <p class="text-sm font-medium text-gray-900">Perubahan gagal
                                                        disimpan</p>
                                                    <p class="mt-1 text-sm text-gray-500">Terdapat kesalahan pada sistem
                                                    </p>
                                                </div>
                                                <div class="ml-4 flex flex-shrink-0">
                                                    <button type="button" @click="save_error = false"
                                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span class="sr-only">Close</span>
                                                        <ion-icon name="close" class="h-5 w-5"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="notification_failed">
                        <div aria-live="assertive"
                            class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
                            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                                <transition enter-active-class="transform ease-out duration-300 transition"
                                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                                    <div v-if="save_failed"
                                        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div class="p-4">
                                            <div class="flex items-start">
                                                <div class="flex-shrink-0">
                                                    <ion-icon name="close-circle"
                                                        class="text-2xl mb-0 text-red-400"></ion-icon>

                                                </div>
                                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                                    <p class="text-sm font-medium text-gray-900">Perubahan gagal
                                                        disimpan</p>
                                                    <p class="mt-1 text-sm text-gray-500">Periksa kembali data profil
                                                        anda</p>
                                                </div>
                                                <div class="ml-4 flex flex-shrink-0">
                                                    <button type="button" @click="save_failed = false"
                                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span class="sr-only">Close</span>
                                                        <ion-icon name="close" class="h-5 w-5"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>

                    <div class="akun_header mb-6 px-4 sm:px-0 mt-5">
                        <h1>Hey {{ nama.split(' ')[0] }}</h1>
                    </div>

                    <div class="px-4 sm:px-0">
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Detail Akun</h3>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Pengaturan Akun</p>
                    </div>
                    <div class="mt-6 border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">

                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Nama Lengkap</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div>
                                        <New_nama :parent_component_nama="nama"
                                            @update:parent_component_nama="nama = $event"
                                            @nama_status="cek_validity('akun_nama', $event)" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Alamat Email</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <New_email :parent_component_email="email" />
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Nomor Telepon</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <New_telephone :parent_component_telephone="telephone"
                                        @update:parent_component_telephone="telephone = $event"
                                        @telephone_status="cek_validity('akun_telp', $event)" />
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Jenis Kelamin</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <New_gender :parent_component_gender="jenis_kelamin"
                                        @update:parent_component_gender="jenis_kelamin = $event"
                                        @gender_status="cek_validity('jenis_kelamin', $event)" />
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Tanggal Lahir</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <New_birthdate :parent_component_birthdate="birthdate"
                                        @update:parent_component_birthdate="birthdate = $event"
                                        @birthdate_status="cek_validity('birthdate', $event)" />
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Kata Sandi</dt>
                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <router-link :to="{ name: 'ubah_kata_sandi' }"
                                        class="font-semibold text-lime-600 hover:text-lime-800">Ubah Kata
                                        Sandi</router-link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-center gap-x-6 px-4 sm:px-0">
                    <button type="button" @click="saveProfile" :disabled="!hasChanges"
                        class="rounded-md bg-lime-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import New_email from '@/components/input/new_email blocked.vue';
import New_telephone from '@/components/input/new_telephone.vue';
import New_birthdate from '@/components/input/new_birthdate.vue';
import New_nama from '@/components/input/new_nama.vue';
import New_gender from '@/components/input/new_gender.vue';
import { change_user_profile, get_user_data } from '@/components/logic/API/user';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: { New_nama, New_email, New_telephone, New_birthdate, New_gender, Spinner },
    mounted() {
        this.getuser();
    },
    data() {
        return {
            dataLoaded: false,
            nama: "",
            email: "",
            telephone: "",
            birthdate: "",
            jenis_kelamin: "",
            userId: "",
            validity_state: {
                akun_nama: true,
                akun_email: true,
                akun_telp: true,
                birthdate: true,
                jenis_kelamin: true
            },
            save_success: false,
            save_failed: false,
            save_error: false,


            hasChanges: false,
            data_awal: {
                nama: "",
                telephone: "",
                birthdate: "",
                jenis_kelamin: ""
            }
        }
    },
    computed: {
        isFormValid() {
            return Object.values(this.validity_state).every(value => value === true || value === null);
        }
    },
    watch: {
        jenis_kelamin(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.validity_state.jenis_kelamin = true;
                this.checkChanges();
            }
        },
        nama(newVal) {
            this.checkChanges();
        },
        telephone(newVal) {
            this.checkChanges();
        },
        birthdate(newVal) {
            this.checkChanges();
        }
    },
    methods: {
        cek_all_validity() {
            if (this.validity_state.akun_nama === true && this.validity_state.akun_email === true && this.validity_state.akun_telp === true && this.validity_state.birthdate === true && this.validity_state.jenis_kelamin === true) {
                return true;
            } else {
                return false;
            }
        },
        cek_validity(field, status) {
            this.validity_state[field] = status;
        },
        formatDateFromAPI(dateString) {
            if (!dateString) return '';
            try {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            } catch {
                return '';
            }
        },
        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails == false) {
                    this.$router.push({ name: 'akun', params: { param_1: 'redirect-detail-akun', param_2: 'redirect-detail-akun' } });
                }

                else {
                    this.userId = sessionDetails.userid;
                    let data_user = await get_user_data(this.userId);

                    this.nama = data_user.user.name;
                    this.email = data_user.user.email;
                    this.telephone = data_user.user.phoneNum;
                    this.birthdate = this.formatDateFromAPI(data_user.user.dateOfBirth);
                    this.jenis_kelamin = data_user.user.gender;

                    this.data_awal = {
                        nama: this.nama,
                        telephone: this.telephone,
                        birthdate: this.birthdate,
                        jenis_kelamin: this.jenis_kelamin
                    };

                    this.dataLoaded = true;
                }
            } catch (error) {
                alert('Maaf, ada kesalahan pada sistem kami ', error);
            }
        },
        checkChanges() {
            this.hasChanges =
                this.nama !== this.data_awal.nama ||
                this.telephone !== this.data_awal.telephone ||
                this.birthdate !== this.data_awal.birthdate ||
                this.jenis_kelamin !== this.data_awal.jenis_kelamin;
        },
        async saveProfile() {
            if (this.cek_all_validity()) {
                try {
                    const hasil = await change_user_profile(this.userId, this.nama, this.telephone, this.jenis_kelamin, this.birthdate);

                    if (hasil.status == 1) {
                        this.hasChanges = false;
                        this.save_success = true;
                        setTimeout(() => {
                            this.save_success = false;
                        }, 4500);
                    }
                    else {
                        this.save_error = true;
                        setTimeout(() => {
                            this.save_error = false;
                        }, 4500);
                    }
                } catch (error) {
                    console.error('Error saving profile:', error);
                    this.save_failed = true;
                    setTimeout(() => {
                        this.save_failed = false;
                    }, 4500);
                }
            }

            else {
                this.save_failed = true;
                setTimeout(() => {
                    this.save_failed = false;
                }, 4500);

            }

        }
    }
}
</script>

<style scoped>
div.akun_header h1 {
    font-size: 25px;
    font-weight: bold;
}

.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
