<template>
    <div class="bg-white">
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
                                                    <p class="text-sm font-medium text-gray-900">Kata Sandi telah di
                                                        ubah</p>
                                                    <p class="mt-1 text-sm text-gray-500">Perubahan kata sandi berhasil
                                                        di
                                                        lakukan</p>
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
                                                    <p class="text-sm font-medium text-gray-900">Perubahan kata sandi
                                                        gagal
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
                                                    <p class="text-sm font-medium text-gray-900">Perubahan kata sandi
                                                        gagal</p>
                                                    <p class="mt-1 text-sm text-gray-500">Periksa kata sandi lama anda
                                                    </p>
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
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Ubah Kata Sandi</h3>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Penggantian Kata Sandi</p>
                    </div>
                    <div class="mt-6 border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Kata Sandi Lama</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div class="relative rounded-md shadow-sm">
                                        <input type="password" name="password" id="password_baru"
                                            @input="handlePasswordInput"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            v-model="pw_lama" />


                                        <!-- <div
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
                                        </div> -->
                                    </div>

                                    <!-- <p class="mt-2 text-sm text-red-600" id="email-error">Kata Sandi Lama Salah</p> -->

                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Kata Sandi Baru</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <New_password ref="passwordComponent" @pw_element="receive_password"></New_password>
                                    <p v-if="isSamePassword" class="mt-4 text-sm text-left text-red-600">
                                        Kata sandi baru tidak boleh sama dengan kata sandi lama
                                    </p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-center gap-x-6 px-4 sm:px-0">
                    <button type="button" @click="savePassword" :disabled="!isFormValid || !isChange || isSamePassword"
                        class="rounded-md bg-orange-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        Ubah Kata Sandi
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import New_password from '@/components/input/new_password.vue';
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session_service';
import { change_user_password, get_user_data } from '@/components/logic/API/expert/expert_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: { New_password, Spinner },
    mounted() {
        this.getuser();
    },
    data() {
        return {
            dataLoaded: false,
            nama: "User",
            pw_lama: "",
            pw_baru: "",
            userId: "",
            isFormValid: false,
            save_success: false,
            save_error: false,
            save_failed: false,
            pw_validity: false,
            isChange: false,
            lastPwLama: "",
            lastPwBaru: "",
        };
    },
    computed: {
        isFormValid() {
            return this.pw_lama.length >= 6 && this.pw_validity;
        },
        isSamePassword() {
            if (!this.pw_lama || !this.pw_baru) return false;
            const difference = this.getPasswordDifference(this.pw_lama, this.pw_baru);
            return difference === 0 || difference === 1;
        }
    },
    watch: {
        pw_lama(newVal) {
            if (newVal.length < 8) {
                this.save_failed = false;
            }
            this.checkChanges();
        },
        pw_baru(newVal) {
            this.checkChanges();
        }
    },
    methods: {
        receive_password(password) {
            this.lastPwBaru = this.pw_baru;
            this.pw_baru = password;
            this.pw_validity = password.length >= 6;
        },
        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();
                this.userId = sessionDetails.userid;
                let data_user = await get_user_data(this.userId);
                this.nama = data_user.user.name;
                this.data_awal = {
                    nama: this.nama,
                };
                this.dataLoaded = true;
            } catch (error) {
                alert('Maaf, ada kesalahan pada sistem kami', error);
            }
        },

        async savePassword() {
            if (this.isSamePassword) {
                this.save_failed = true;
                setTimeout(() => {
                    this.save_failed = false;
                }, 4500);
                return;
            }

            try {
                const hasil = await change_user_password(this.userId, this.pw_lama, this.pw_baru);
                console.log(hasil);
//logic masih salah
                if (hasil.status == 1) {
                    this.hasChanges = false;
                    this.save_success = true;
                    setTimeout(() => {
                        this.save_success = false;
                        this.$router.push({ name: 'akun_expert' });
                    }, 4500);
                }
                else if (hasil.status == 0) {
                    this.save_failed = true;
                    this.resetAllPasswords();
                    setTimeout(() => {
                        this.save_failed = false;
                    }, 4500);
                }

            } catch (error) {
                this.save_error = true;
                setTimeout(() => {
                    this.save_error = false;
                }, 4500);
            }

        },
        checkChanges() {
            this.isChange = this.pw_lama.length > 0 && this.pw_baru.length > 0;
        },
        handlePasswordInput(e) {
            this.lastPwLama = this.pw_lama;
        },
        getPasswordDifference(str1, str2) {
            let differences = 0;
            const maxLength = Math.max(str1.length, str2.length);
            
            for (let i = 0; i < maxLength; i++) {
                if (str1[i] !== str2[i]) {
                    differences++;
                }
            }
            
            // Also count length difference
            differences += Math.abs(str1.length - str2.length);
            return differences;
        },
        resetAllPasswords() {
            this.pw_lama = "";
            this.pw_baru = "";
            this.isChange = false;
            this.pw_validity = false;
            this.lastPwLama = "";
            this.lastPwBaru = "";
            // Reset child component
            this.$refs.passwordComponent.resetPasswordInput();
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
