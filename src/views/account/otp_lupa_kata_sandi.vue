<template>
  <div class="all" v-if="is_render">
  <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Lupa Kata Sandi</h2>
      </div>

      <div class="otp_success" v-if="otp_success">
        <div class="rounded-md bg-green-50 p-3 pb-2">
          <div class="flex">
            <div class="flex-shrink-0 mb-0">
              <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm font-bold text-green-800">Kata Sandi baru akan dikirimkan ke email anda</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="batal_otp" class="batal_otp mb-4">
        <div class="rounded-md bg-red-50 p-3 pb-1">
          <div class="flex">
            <div class="flex-shrink-0">
              <ion-icon name="close-circle" class="text-2xl mb-0 text-red-400"></ion-icon>
            </div>
            <div class="ml-3 pt-0.5">
              <p class="text-sm font-bold text-red-800">OTP di batalkan</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button type="button"
                  class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  @click="this.$router.push({ name: 'akun' });">
                  <span class="sr-only">Dismiss</span>
                  <ion-icon name="close" class="h-5 w-5"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="force_cancel_sign_up" class="batal_daftar mb-4">
        <div class="rounded-md bg-red-50 p-3 pb-1">
          <div class="flex">
            <div class="flex-shrink-0 mb-0" style="height: 24px;">
              <ion-icon name="close-circle" class="text-2xl mb-0 text-red-400"></ion-icon>
            </div>
            <div class="ml-3 pt-0.5 pb-3">
              <p class="text-sm font-bold text-red-800">Terlalu banyak percobaan OTP</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button type="button"
                  class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  @click="this.$router.push({ name: 'home' });">
                  <span class="sr-only">Dismiss</span>
                  <ion-icon name="close" class="h-5 w-5"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="otp_send_again" v-if="otp_send_again">
        <div class="rounded-md bg-green-50 p-3 pb-2">
          <div class="flex">
            <div class="flex-shrink-0 mb-0" style="height: 24px;">
              <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm font-bold text-green-800">Kode OTP berhasil dikirim ({{ temp_val_otp.send }}/3)
              </p>
            </div>
          </div>
        </div>
      </div>

      <form class="space-y-6" @submit.prevent="try_otp()">
        <div>
          <label for="otp" class="block text-sm font-medium leading-6 text-gray-900">Masukkan OTP</label>
          <div class="mt-2">

            <div class="relative rounded-md shadow-sm">


              <input type="text" name="otp" id="otp" v-model="otp_value" maxlength="6" inputmode="numeric"
                pattern="[0-9]*"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Masukkan 6 digit OTP" aria-describedby="email-description"
                @input="otp_value = otp_value.replace(/[^0-9]/g, '')" />

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" id="otp_icon"
                v-if="otp_not_valid || status_otp">
                <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
              </div>



            </div>

            <div class="new_status_otp" v-if="status_otp">
              <p class="mt-2 text-sm text-red-600" id="otp-salah">Kode OTP salah ({{ temp_val_otp.try }}/3)</p>
            </div>

          </div>
          <p class="mt-2 text-sm text-gray-500" id="email-description">Silahkan masukkan kode OTP yang telah di kirimkan ke Email {{ akun_email }}, atau anda ingin
            <span @click="batalkan_lupa_kata_sandi()" id="batalkan_lupa_kata_sandi"
              class="font-semibold text-lime-600 hover:text-lime-800">batalkan lupa kata sandi</span>
          </p>

        </div>
        <div>
            <button type="submit"
            class="flex w-full justify-center rounded-md bg-lime-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ 'cursor-not-allowed': !otp_value || otp_not_valid || temp_val_otp.try >= 3 }"
            :disabled="!otp_value || otp_not_valid || temp_val_otp.try >= 3">Verifikasi OTP
            </button>
        </div>
      </form>

      <p class="text-center text-sm leading-6 text-gray-500">
        Tidak menemukan mendapatkan kode OTP ?
        {{ ' ' }}
        <button id="kirim_ulang_otp" :disabled="temp_val_otp.send >= 3"
          :class="{ 'cursor-not-allowed text-gray-400': temp_val_otp.send >= 3, 'font-semibold text-lime-600 hover:text-lime-800': temp_val_otp.send < 3 }"
          @click="kirim_ulang_otp()">Kirim ulang OTP</button>
      </p>
    </div>
  </div>
 

  
  </div>
</template>


<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { clear_otp_count, get_otp_count, register, reset_password, send_otp, set_otp_count, verify_otp } from '@/components/logic/API/user';

export default { 
  data() {
    return {
      akun_email: '',
      otp_value: "",
      is_render: true,
      batal_otp: false,
      otp_not_valid: false,
      status_otp: null,
      otp_success: false,
      otp_send_again: false,
      force_cancel_sign_up: false,

      temp_val_otp: {
        send: 0,
        try: 0,
      }
    }
  },
  mounted() {
    this.update_get_otp_count();
    this.try_get_session();
  },

  watch: {
    otp_value(newVal) {
      if (newVal.length < 6) {
        this.otp_not_valid = true;
      } else {
        this.otp_not_valid = false;
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
          if (sessionDetails.phase != 3) {
            this.$router.push({ name: 'akun' });
          }
          else if (sessionDetails.phase == 3) {
            this.akun_email = sessionDetails.akun_email;
            this.is_render = true;
          }

        }
        if (this.temp_val_otp.try >= 3 && this.temp_val_otp.send >= 3) {
          this.force_cancel_sign_up = true;
          setTimeout(async () => {
            this.force_cancel_sign_up = false;
            clear_otp_count();
            const sessionStore = usetelecos_session_detailsStore(); 
            await sessionStore.cleartelecos_session_details();
          }, 5000); 
          this.$router.push({ name: 'akun' });

        }
      } catch (error) {
        console.error('Failed to load session details:', error);
      }
    },

    async batalkan_lupa_kata_sandi() {
      const sessionStore = usetelecos_session_detailsStore();
      await sessionStore.cleartelecos_session_details();
      clear_otp_count(); 
      this.batal_otp = true;
      setTimeout(() => {
        this.$router.push({ name: 'akun' });
      }, 3000);
    },

    async try_register() {
      const sessionStore = usetelecos_session_detailsStore();
      let register_data = await sessionStore.loadtelecos_session_details();
      let user_daftar = await register(register_data.akun_nama, register_data.akun_email, register_data.akun_telp, register_data.jenis_kelamin, register_data.birthdate, register_data.akun_sandi);
      if (user_daftar["status"] == 1) {
        sessionStore.cleartelecos_session_details();
        sessionStore.savetelecos_session_details(user_daftar.user["userId"], user_daftar.user["userRole"], session_expirate(30));
      }
      await new Promise(resolve => setTimeout(resolve, 3500));
      this.$router.push({ name: 'home' });
    },

    async try_otp() {
      let response = await verify_otp(this.akun_email, this.otp_value);
      
      clear_otp_count();
      set_otp_count(this.akun_email, this.temp_val_otp.send, this.temp_val_otp.try + 1);
      this.update_get_otp_count();

      if (response["status"] == 0) {
        this.status_otp = true;
        this.otp_value = "";
        setTimeout(() => {
          this.otp_not_valid = false;
          this.status_otp = false;
          
          if (this.temp_val_otp.try >= 3 && this.temp_val_otp.send >= 3) {
            this.force_cancel_sign_up = true;
            setTimeout(async () => {
              this.force_cancel_sign_up = false;
              clear_otp_count();
              const sessionStore = usetelecos_session_detailsStore();
              await sessionStore.cleartelecos_session_details();
              this.$router.push({ name: 'akun' });
            }, 3000);
          }
        }, 5000);
      }
      else if (response["status"] == 1) {
        this.otp_success = true;
        console.log(await reset_password(this.akun_email));
        clear_otp_count();
        setTimeout(async () => { 
          this.otp_success = false;
          const sessionStore = usetelecos_session_detailsStore();
          await sessionStore.cleartelecos_session_details();
          this.$router.push({ name: 'akun' });
        }, 3000);
      }
      else if (response["status"] == 3) {
        this.otp_not_valid = true;
      }
    },

    async kirim_ulang_otp() {
      send_otp(this.akun_email);
      this.otp_value = "";
      clear_otp_count();
      set_otp_count(this.akun_email, this.temp_val_otp.send + 1, 0);
      this.update_get_otp_count();
      this.otp_send_again = true;
      setTimeout(async () => {
        this.otp_send_again = false;
      }, 5000);
    },

    async update_get_otp_count() {
      this.temp_val_otp.try = parseInt(get_otp_count().otp_try);
      this.temp_val_otp.send = parseInt(get_otp_count().otp_send);
    }

  },

}
</script>

<style>
#batalkan_lupa_kata_sandi {
  cursor: pointer;
}
</style>