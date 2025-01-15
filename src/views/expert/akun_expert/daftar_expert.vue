<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Daftar Akun</h2>
      </div>
  
      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12  sm:rounded-lg sm:px-12">
  
          <div v-if="status_daftar == 1" class="login_success mb-4">
            <div class="rounded-md bg-green-50 p-3 pb-2">
              <div class="flex">
                <div class="flex-shrink-0 mb-0">
                  <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
                </div>
                <div class="ml-3 flex-1 md:flex md:justify-between">
                  <p class="text-sm font-bold text-green-800">Berhasil Daftar Akun</p>
                  <p class="mt-3 text-sm md:ml-6 md:mt-0">
  
                    <router-link :to="{ name: 'home' }"
                      class="whitespace-nowrap font-medium text-green-700 hover:text-green-600">
                      Ke Halaman Utama
                      <span aria-hidden="true"> &rarr;</span>
                    </router-link>
  
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div v-if="status_daftar == 2" class="login_fail mb-4">
            <div class="rounded-md bg-red-50 p-3 pb-1">
              <div class="flex">
                <div class="flex-shrink-0">
                  <ion-icon name="close-circle" class="text-2xl mb-0 text-red-400"></ion-icon>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-bold text-red-800">Gagal Daftar Akun</p>
                </div>
                <div class="ml-auto pl-3">
                  <div class="-mx-1.5 -my-1.5">
                    <button type="button"
                      class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      @click="this.status_daftar = 0">
                      <span class="sr-only">Dismiss</span>
                      <ion-icon name="close" class="h-5 w-5"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <form class="space-y-6" @submit.prevent="register_next_step">
  
            <div>
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nama Lengkap</label>
              <div class="mt-2">
                <New_nama v-model:parent_component_nama="akun_nama"
                  @nama_status="status => cek_validity('akun_nama', status)" />
              </div>
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <New_email 
                  v-model="akun_email"
                  :email-in-use="email_in_use"
                  @email_status="status => cek_validity('akun_email', status)" />
              </div>
            </div>
  
            <div>
              <label for="tel" class="block text-sm font-medium leading-6 text-gray-900">Nomor Telepon 🇮🇩</label>
              <div class="mt-2">
                <New_telephone v-model:parent_component_telephone="akun_telp"
                  @telephone_status="status => cek_validity('akun_telp', status)" />
              </div>
            </div>
  
            <div>
              <label for="tel" class="block text-sm font-medium leading-6 text-gray-900">Jenis Kelamin</label>
              <div class="mt-2">
                <select id="jenis_kelamin" name="jenis_kelamin" v-model="jenis_kelamin"
                  class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="Laki Laki">Laki Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
  
            <div>
              <label for="calendar" class="block text-sm font-medium leading-6 text-gray-900">Tanggal Lahir</label>
              <div class="mt-2">
                <New_birthdate v-model:parent_component_birthdate="birthdate"
                  @birthdate_status="status => cek_validity('birthdate', status)" />
              </div>
            </div>
  
            <div>
              <label for="calendar" class="block text-sm font-medium leading-6 text-gray-900">Kategori Ahli</label>
              <div class="mt-2">
                <New_jenis_ahli 
                  v-model:parent_component_jenis_ahli="jenis_ahli"
                  @jenis_ahli_status="status => cek_validity('jenis_ahli', status)"
                />
              </div>
            </div>

            <div>
              <label for="str" class="text-sm font-medium leading-6 text-gray-900">Nomor STR</label>
              <div class="mt-2">
                <!-- {{ noSTR }} -->
                <New_str_expert
                  v-model="noSTR"
                  @str_status="status => cek_validity('noSTR', status)"
                />
              </div>
            </div>

            <div>
              <label for="calendar" class="block text-sm font-medium leading-6 text-gray-900">Lokasi Praktik</label>
              <div class="mt-2">
                <!-- {{ lokasi_praktek }} -->
                <New2_lokasi_praktek_expert
                  v-model:parent_component_lokasi="lokasi_praktek"
                  @lokasi_status="status => cek_validity('lokasi_praktek', status)"
                />
              </div>
            </div>

            <div>
              <label for="str" class="text-sm font-medium leading-6 text-gray-900">Almamater</label>
              <div class="mt-2"> 
                <New_almamater_expert
                  v-model:parent_component_nama="almamater"
                  @nama_status="status => cek_validity('almamater', status)"
                ></New_almamater_expert>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="mt-2">
                <New_password @pw_element="receive_password" @pw_status="status => cek_validity('akun_sandi', status)">
                </New_password>
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
              </div>
            </div>
  
            <div>
              <button type="submit" :disabled="!allFieldsValid"
                class="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400">Daftar
                Akun</button>
            </div>
            <!-- <button type="submit" :disabled="" class="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Daftar Akun</button> -->
  
          </form>
        </div>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Sudah Memiliki Akun ?
  
          <button @click="$emit('change_phase', true)" class="font-semibold text-orange-600 hover:text-orange-800">Masuk
            Sekarang</button>
          <!-- <router-link :to="{ name: 'masuk' }" class="font-semibold text-orange-600 hover:text-orange-800">Masuk
            Sekarang</router-link> -->
        </p>
      </div>
    </div>
  
    <!-- <div class="validity">
      <p>nama : {{ validity_state.akun_nama }} {{ this.akun_nama }}</p>
      <p>email : {{ validity_state.akun_email }} {{ this.akun_email }}</p>
      <p>telephone : {{ validity_state.akun_telp }} {{this.akun_telp}}</p>
      <p>jenis_kelamin : {{ validity_state.jenis_kelamin }} {{this.jenis_kelamin}}</p>
      <p>birthdate : {{ validity_state.birthdate }} {{this.birthdate}}</p>
      <p>password : {{ validity_state.akun_sandi }} {{ this.akun_sandi }}</p>
    </div> -->
  </template>
  
  <script>
  import New_email from '@/components/input/new_email.vue';
  import New_password from '@/components/input/new_password.vue';
  import New_telephone from '@/components/input/new_telephone.vue';
  import New_birthdate from '@/components/input/new_birthdate.vue';
  import New_nama from '@/components/input/new_nama.vue';
  import { session_expirate, register, send_otp, set_otp_count } from '@/components/logic/API/expert/expert';
  import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session';
import New_str_expert from '@/components/input/new_str_expert.vue';
import New2_lokasi_praktek_expert from '@/components/input/new2_lokasi_praktek_expert.vue';
import New_jenis_ahli from '@/components/input/new_jenis_ahli.vue';
import New_almamater_expert from '@/components/input/new_almamater_expert.vue';
  
  export default {
    components: { New_nama, New_birthdate, New_email, New_password, New_telephone , New_str_expert, New2_lokasi_praktek_expert, New_jenis_ahli, New_almamater_expert},
    data() {
      return {
        akun_nama: '',
        akun_email: '',
        akun_telp: '62',
        akun_sandi: '',
        jenis_kelamin: '',
        birthdate: '',
        email_in_use: false,
        noSTR: '',
        lokasi_praktek: '',
        almamater: '', // Add this line
        jenis_ahli: '',
        allFieldsValid: false,
  
        status_daftar: 0,
  
        validity_state: {
          akun_nama: null,
          akun_email: null,
          akun_telp: null,
          akun_sandi: null,
          jenis_kelamin: null,
          birthdate: null,
          noSTR: null,
          lokasi_praktek: null,
          almamater: null,  // Add this line
          jenis_ahli: null
        }
      }
    },
  
    watch: {
      jenis_kelamin(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.cek_validity('jenis_kelamin', true);
        }
      },
      akun_email(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.email_in_use = false;
        }
      },
      validity_state: {
        deep: true,
        handler(newVal) {
          this.allFieldsValid = Object.values(newVal).every(status => status === true);
          // console.log(this.allFieldsValid)
        }
      }
    },
  
    emits: ['change_phase'],
  
    methods: {
  
  
      async register_next_step() {
        const sessionStore = usetelecos_session_detailsStore(); 
        await sessionStore.save_temporary_telecos_register({
          phase:2,
          nama: this.akun_nama,
          email: this.akun_email,
          telp: this.akun_telp,
          sandi: this.akun_sandi,
          jenis_kelamin: this.jenis_kelamin,
          birthdate: this.birthdate,
          jenis_ahli: this.jenis_ahli,
          noSTR: this.noSTR,
          almamater:this.almamater,
          lokasi_praktek: this.lokasi_praktek,
          jenis_ahli: this.jenis_ahli,
          expirate: session_expirate(1)
        });
  
        set_otp_count(this.akun_email,1,0);
        send_otp(this.akun_email);
        this.$router.push({ name: 'otp_expert' });
      },
  
      receive_password(password) {
        this.akun_sandi = password;
      },
  
      cek_validity(field, status) {
        this.validity_state[field] = status;
      },
    }
  }
  </script>
  
  <style></style>
