<template> 
    <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm space-y-10">
        <div> 
          <!-- <Logo class="mx-auto h-10 w-auto" /> -->
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Daftar Akun</h2>
        </div>
        <div id="hasil" class="space-y-6">
            
            <div class="status">
                <h1>Pendaftaran Akun Gagal</h1>  
                <ion-icon name="close-circle" id="silang"></ion-icon> 
            </div>

            <div class="additional_status">
                <p id="status_message">Mohon Maaf, pendaftaran akun Anda saat ini belum berhasil, silahkan memeriksa kembali apakah email {{ akun_email }} dapat menerima pesan OTP, sebelum anda mencoba mendaftar kembali beberapa saat lagi</p>
            </div>


            <div>
                <router-link :to="{ name: 'home_expert'}" class="flex w-full justify-center rounded-md bg-lime-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Halaman Utama</router-link>  
            </div>


        </div>
  
         
      </div>
    </div>
  </template>
  

<script> 
import Logo from '@/components/logo/logo_divisi_akun.vue'; 
export default {
components : {Logo},
  data() {
    return {
    }
  },

    methods: {

    },

}
</script>

<style scoped>
div.status{
    display : flex;
    align-content: center;
    align-items: center;
    gap: 5px; 
}

 div.status ion-icon#silang{
    font-size: 22px;
    color: red;
 } 
 
div.additional_status p#status_message{
    font-size: 14px;
}
</style>