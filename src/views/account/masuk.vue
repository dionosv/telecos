<template>
  <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Selamat Datang</h2>
      </div>

      <div v-if="login_success" class="login_success">
        <div class="rounded-md bg-green-50 p-3 pb-2">
          <div class="flex">
            <div class="flex-shrink-0 mb-0 mt-0.4">
              <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm font-bold text-green-800 mt-0.5">Berhasil Masuk</p>
              <div class="md:ml-6">
                <div class="batas_running_text">
                  <div class="text-sm text-green-700 m-0 p-0 running-text" id="running_text">
                    Mengarahkan ke halaman {{ redirection_page_name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="login_failed" class="login_fail">
        <div class="rounded-md bg-red-50 p-3 pb-1">
          <div class="flex">
            <div class="flex-shrink-0">
              <ion-icon name="close-circle" class="text-2xl mb-0 text-red-400"></ion-icon>
            </div>
            <div class="ml-3">
              <p class="text-sm font-bold text-red-800">Gagal Masuk</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button type="button"
                  class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  @click="login_failed = false">
                  <span class="sr-only">Dismiss</span>
                  <ion-icon name="close" class="h-5 w-5"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form class="space-y-6" @submit.prevent="try_login">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
          <div>
            <label for="email-address" class="sr-only">Alamat Email</label>
            <input id="email-address" name="email" type="email" autocomplete="email" v-model="akun_email"
              class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Alamat Email" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="akun_sandi"
              class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Kata Sandi" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <label for="remember-me" class=" block text-sm leading-6 text-gray-900">Lupa Kata Sandi</label>
          </div>

          <div class="text-sm leading-6">
            <router-link :to="{ name: 'lupa' }" class="font-semibold text-lime-600 hover:text-lime-800">Reset Kata
              Sandi</router-link>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="!akun_email || !akun_sandi"
            class="flex w-full justify-center rounded-md bg-lime-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400">Masuk</button>
        </div>
      </form>


      <div class="all">
        <p class="text-center text-sm leading-6 text-gray-500">
          Belum punya akun ?
          <button @click="$emit('change_phase')" class="font-semibold text-lime-600 hover:text-lime-800">Daftar
            Sekarang</button>
        </p>

        <p class="text-center text-sm text-gray-500 m-0">
          Masuk dengan
          <router-link :to="{ name: 'akun_expert' }" class="font-semibold text-orange-500 hover:text-orange-600">
            akun ahli </router-link>
        </p>

      </div>
    </div>
  </div>

</template>


<script>
import { session_expirate, login } from '@/components/logic/API/user';
import Logo from '@/components/logo/logo_divisi_akun.vue';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { handle_url_page_title, url_preprocess } from '@/components/logic/user_url_preprocess/user_preprocess';

export default {
  components: { Logo },
  props: {
    additional_param: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return {
      akun_email: 'dion.hananto14@gmail.com',
      akun_sandi: 'Solo2121!',
      login_failed: false,
      login_success: false,
      redirection_page_name: "Home"
    }
  },
  emits: ['change_phase'],
  mounted() { },
  watch: {
    additional_param: {
      immediate: true,
      handler(newVal) { }
    }
  },
  methods: {
    async try_login() {
      const sessionStore = usetelecos_session_detailsStore();
      let user_masuk = await login(this.akun_email, this.akun_sandi);
      if (user_masuk["status"] == 1) {
        sessionStore.savetelecos_session_details(user_masuk.user["userId"], user_masuk.user["userRole"], session_expirate());
        this.login_failed = false;
        this.redirection_page_name = handle_url_page_title(this.additional_param);
        // console.log(this.redirection_page_name);
        this.login_success = true;
        await this.handle_add_param();
      } else {
        this.login_failed = true;
        this.akun_sandi = '';
      }
    },
    async handle_add_param() {
      await new Promise(resolve => setTimeout(resolve, 6000));
      if (this.additional_param && this.additional_param.length > 0) {
        try {
          url_preprocess(this.additional_param);
        } catch (error) {
          console.error("Error in url_preprocess:", error);
          this.redirection_page_name = "Home";
          this.$router.push({ name: "home" });
        }
      } else {
        this.redirection_page_name = "Home";
        this.$router.push({ name: "home" });
      }
    }
  },
}
</script>

<style>
.login_success {
  animation: flashIn 2s;
}

.login_fail {
  animation: flashIn 2s;
}

@keyframes flashIn {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.batas_running_text {
  width: 190px;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
}

.running-text {
  display: inline-block;
  white-space: nowrap;
  animation: running-text 5s linear infinite;
}

@keyframes running-text {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>