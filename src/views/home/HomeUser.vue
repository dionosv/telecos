<template>

      <banner></banner>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 fade-in">
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
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Data to enrich your
                online business</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt
                sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
                aliqua.</p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
                  started</a>
                <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span
                    aria-hidden="true">→</span></a>
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
      <p>Solusi konsultasi kecantikan terdepan</p>
    </div>

    <div class="split_2">
      <Bigmenu></Bigmenu>
      <!-- <user_tabs></user_tabs> -->
      <New_user_tabs_artikel></New_user_tabs_artikel> 
    </div>

    <div class="bottom_side">
      <Tawaran_ahli></Tawaran_ahli>
    </div>
 

  </div>

</template>

<script>
import banner from '@/components/banner/banner.vue';
import home_user_carousel from '@/components/carousel/home_user_carousel.vue'; 
import Bigmenu from '@/components/home_widget/bigmenu.vue';
import New_user_tabs_artikel from '@/components/home_widget/new_user_tabs_artikel.vue';
import Tawaran_ahli from '@/components/home_widget/tawaran_ahli.vue';
import user_tabs from '@/components/home_widget/user_tabs.vue';

export default {
  components: { 
    banner,
    home_user_carousel,
    user_tabs,
    Bigmenu,Tawaran_ahli,
    New_user_tabs_artikel
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
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  /* max-height: 280px !important; */
  height: 310px;
  justify-content: center;
  align-items: center;
}

.text_heading{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 6rem;
  font-size: 20px;
  font-weight: bold;
  color: #333;

}

@media screen and (max-width: 768px) {
  .split_2 {
    flex-direction: column;
    flex-wrap: nowrap;
    height: 1000px;
    width: 100%;
  }


  .text_heading{ 
  margin-top: 3rem;
  margin-bottom: 3rem; 
  font-size: 20px;

}
}
</style>