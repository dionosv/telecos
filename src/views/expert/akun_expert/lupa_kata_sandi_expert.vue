<template>
    <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm space-y-10">
        <div>
  
          <div class="notification">
            <div class="notification_success">
              <div aria-live="assertive"
                class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
                <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                  <transition enter-active-class="transform ease-out duration-300 transition"
                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="otp_success"
                      class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div class="p-4">
                        <div class="flex items-start">
                          <div class="flex-shrink-0">
                            <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
                          </div>
                          <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">OTP berhasil dikirim</p>
                            <p class="mt-1 text-sm text-gray-500">Anda akan diarahkan untuk validasi OTP</p>
                          </div>
                          <div class="ml-4 flex flex-shrink-0">
                            <button type="button" @click="otp_success = false"
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
                    <div v-if="otp_failed"
                      class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div class="p-4">
                        <div class="flex items-start">
                          <div class="flex-shrink-0">
                            <ion-icon name="chatbubbles" class="text-2xl mb-0 text-green-400"></ion-icon>
                          </div>
                          <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">Lupa email akun anda ?</p>
                            <p class="mt-1 text-sm text-gray-500">Hubungi Telecos Care untuk mencari email akun anda</p>
                          </div>
                          <div class="ml-4 flex flex-shrink-0">
                            <button type="button" @click="otp_failed = false"
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
  
          </div>
  
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Lupa Kata Sandi</h2>
        </div>
        <form class="space-y-6" @submit.prevent="forget_otp">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <New_email v-model="akun_email" @email_status="updateEmailStatus" />
              <!-- <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="dion.hananto@binus.ac.id" aria-describedby="email-description" /> -->
            </div>
            <p class="mt-2 text-sm text-gray-500" id="email-description">Jika Email anda valid dan terdaftar sebagai ahli di telecos,
              maka kami akan mengirimkan kode OTP ke email anda untuk mengubah kata sandi anda</p>
          </div>
          <div>
            <button :disabled="!isEmailValid"
              class="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400">Kirim
              kode OTP</button>
          </div>
        </form>
  
        <p class="text-center text-sm leading-6 text-gray-500">
          Tidak menemukan akun anda ? Hubungi kami di
          {{ ' ' }}
          <router-link :to="{ name: 'telecos_care_expert' }" class="font-semibold text-orange-600 hover:text-orange-800">Telecos
            Care</router-link>
        </p>
      </div>
    </div>
  </template>
  
  
  <script>
  import New_email from '@/components/input/new_email.vue';
  import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session';
  import { forget_password_otp, session_expirate, set_otp_count } from '@/components/logic/API/expert/expert';
  import Logo from '@/components/logo/logo_divisi_akun.vue';
  
  export default {
    components: { Logo, New_email },
    data() {
      return {
        akun_email: '',
        field_password: "Show",
        isEmailValid: false,
        otp_success: false,
        otp_failed: false,
      }
    },
  
    methods: {
      updateEmailStatus(status) {
        this.isEmailValid = status
      },
      async try_get_session() {
        try {
          const sessionStore = usetelecos_session_detailsStore();
          const sessionDetails = await sessionStore.loadtelecos_session_details();
          if (sessionDetails === false) {
            this.$router.push({ name: 'akun' });
          } else {
            if (sessionDetails.phase != 3) {
              this.$router.push({ name: 'akun' });
            }
            else if (sessionDetails.phase == 3) {
              this.akun_email = sessionDetails.akun_email;
              this.is_render = true;
            }
  
          }
        } catch (error) {
          console.error('Failed to load session details:', error);
        }
      },
  
      async forget_otp() {
        this.isEmailValid = false;
        const response = await forget_password_otp(this.akun_email);
        if (response.status == 1) {
          this.otp_success = true;
          const sessionStore = usetelecos_session_detailsStore();
          await sessionStore.save_temporary_telecos_register({
            phase: 3,
            nama: "Forgot Password",
            email: this.akun_email,
            telp: null,
            sandi: null,
            jenis_kelamin: null,
            birthdate: null,
            expirate: session_expirate(1)
          });
  
          set_otp_count(this.akun_email,1,0);
  
          setTimeout(async () => {
            this.otp_success = false;
            this.$router.push({ name: 'otp_lupa_kata_sandi' });
          }, 3000);
  
  
        }
        else {
          this.otp_failed = true;
          setTimeout(async () => {
            this.otp_failed = false;
            this.isEmailValid = false;
            this.$router.push({ name: 'akun' });
          }, 5000);
        }
      }
  
    },
  
  }
  </script>
  
  <style></style>