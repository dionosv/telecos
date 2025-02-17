<template>

  <!-- <banner></banner> -->

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 fade-in">

    <div class="not_login" v-if="!login">


      <div class="bg-white">
        <div class="relative isolate pt-14">
          <div id="blur-effect" class="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true">
            <div
              class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4ade80] to-[#22c55e] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
          </div>

          <div class="pt-24 sm:pt-32 lg:pb-20">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="mx-auto max-w-2xl text-center">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Selamat Datang di Super App
                  Konsultasi Kecantikan</h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">Dapatkan solusi dan konsultasi kecantikan terpercaya
                  dari para ahli profesional. Kami menyediakan layanan konsultasi online yang mudah dan nyaman untuk
                  membantu Anda mencapai tujuan kecantikan Anda.</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <router-link :to="{ name: 'daftar_ahli_konsultasi' }"
                    class="rounded-md bg-lime-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                    Konsultasi
                  </router-link>
                  <router-link :to="{ name: 'akun' }" class="text-sm font-semibold leading-6 text-gray-900">Daftar Akun
                    <span aria-hidden="true">→</span></router-link>
                </div>
              </div>
              <div class="mt-16 flow-root sm:mt-24">
                <div class="-m-2 rounded-xl  ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 z-100">
                  <home_user_carousel></home_user_carousel>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
      <div class="text_heading">
        <p>Solusi konsultasi terdepan</p>
      </div>

      <div class="split_2">
        <Bigmenu></Bigmenu>
        <New_user_tabs_artikel></New_user_tabs_artikel>
      </div>

      <div class="bottom_side">
        <Tawaran_ahli></Tawaran_ahli>
      </div>

    </div>

    <div class="login" v-if="login">


      <div class="split_2" id="already_login">

        <div class="kiri">
          <h1>Halo, {{ nama }}</h1>
          <Logo_aja></Logo_aja>
        </div>

        <div class="kanann">
          <Bigmenu id="big_menu"></Bigmenu>
          <User_upcoming_events></User_upcoming_events>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
import banner from '@/components/banner/banner.vue';
import home_user_carousel from '@/components/carousel/home_user_carousel.vue';
import Bigmenu from '@/components/home_widget/bigmenu.vue';
import New_user_tabs_artikel from '@/components/home_widget/new_user_tabs_artikel.vue';
import Tawaran_ahli from '@/components/home_widget/tawaran_ahli.vue';
import User_upcoming_events from '@/components/home_widget/user_upcoming_events.vue';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import { get_user_data } from '@/components/logic/API/user_service';
import Logo_aja from '@/components/logo/logo_aja.vue';


export default {
  components: {
    banner,
    home_user_carousel,
    Bigmenu, Tawaran_ahli,
    New_user_tabs_artikel,
    User_upcoming_events,
    Logo_aja
  },

  mounted() {

    this.try_get_session()
  },
  data() {
    return {
      nama: "",
      login: false

    }
  }, methods: {
    async try_get_session() {
      try {
        const sessionStore = usetelecos_session_detailsStore();
        const sessionDetails = await sessionStore.loadtelecos_session_details();
        if (sessionDetails === false) {
          this.login = false  // Changed from true to false
          console.log("not login")
        } else {
          this.login = true   // Changed from false to true
          const hasil = await get_user_data(sessionDetails.userid)
          this.nama = hasil.user.name
        }
      } catch (error) {
        console.error('Failed to load session details:', error);
      }
    },
  },

}
</script>

<style>
#blur-effect {

  z-index: -99999 !important;
  pointer-events: none !important;
  backface-visibility: hidden !important;
}

.split_2 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
}

.kanann {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  /* max-height: 280px !important; */
  height: 310px;
  justify-content: center;
  align-items: center;
}

.text_heading {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 6rem;
  font-size: 20px;
  font-weight: bold;
  color: #333;

}

@media screen and (max-width: 768px) {
  .kannan {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 600px;
    gap: 20px;
    width: 100%;
  }


  .text_heading {
    margin-top: 3rem;
    margin-bottom: 3rem;
    font-size: 20px;

  }

  .split_2 {
  display: block;  
}
 
}
</style>