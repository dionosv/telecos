<template>

    <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

        <div class="notification_success">
            <div aria-live="assertive"
              class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
              <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition"
                  enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                  enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                  leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <div v-if="laporan_success"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="p-4">
                      <div class="flex items-start">
                        <div class="flex-shrink-0">
                          <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                          <p class="text-sm font-medium text-gray-900">Laporan anda berhasil dikirim</p>
                          <p class="mt-1 text-sm text-gray-5000">Laporan anda akan di proses oleh tim Telecos Care secepatnya untuk dapat di selesaikan</p>
                        </div>
                        <div class="ml-4 flex flex-shrink-0"> 
                          <button type="button" @click="laporan_success = false ; this.$router.push({ name: 'telecos_care' });;"
                            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-5000 focus:outline-none focus:ring-2 focus:ring-indigo-5000 focus:ring-offset-2">
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



        <form @submit.prevent="send_laporan">
            <div class="space-y-12">
                <div class="grid grid-cols-1 gap-x-8 gap-y-10   pb-12 md:grid-cols-3">
                    <div>
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Buat Laporan</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Ceritakan masalah anda pada telecos, pihak
                            telecos care akan membantu menyelesaikan permasalahan anda.</p> 
                    </div>

                    <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div class="col-span-full">
                            <label for="permasalahan" class="block text-sm font-medium leading-6 text-gray-900">Topik
                                masalah</label>
                            <div class="mt-2">
                                <div> 
                                    <input type="text" name="title" id="title" maxlength="50"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Topik Masalah" v-model="judul_laporan"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="permasalahan"
                                class="block text-sm font-medium leading-6 text-gray-900">Ceritakan masalah anda</label>

                            <div class="mt-2">
                                <textarea id="permasalahan" name="permasalahan" rows="9" v-model="masalah" placeholder="Ceritakan masalah anda" maxlength="5000"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="col-span-full">

                            <p class="text-sm text-end" :class="{ 'text-red-600': masalah.length > 5000 }">Karakter {{ masalah.length }} / 5000</p>
                        </div>

                        <!-- <div class="col-span-full">
                            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Lampiran</label>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <ion-icon name="images-outline" class="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"></ion-icon>
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-5000">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

                <!-- <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know permasalahan important
                                changes, but you pick what else you want to hear permasalahan.</p>
                        </div>

                        <div class="max-w-2xl space-y-10 md:col-span-2">
                            <fieldset>
                                <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div class="mt-6 space-y-6">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="comments" name="comments" type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label for="comments" class="font-medium text-gray-900">Comments</label>
                                            <p class="text-gray-5000">Get notified when someones posts a comment on a
                                                posting.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="candidates" name="candidates" type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                                            <p class="text-gray-5000">Get notified when a candidate applies for a job.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="offers" name="offers" type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label for="offers" class="font-medium text-gray-900">Offers</label>
                                            <p class="text-gray-5000">Get notified when a candidate accepts or rejects an
                                                offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications
                                </legend>
                                <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your
                                    mobile phone.</p>
                                <div class="mt-6 space-y-6">
                                    <div class="flex items-center gap-x-3">
                                        <input id="push-everything" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        <label for="push-everything"
                                            class="block text-sm font-medium leading-6 text-gray-900">Everything</label>
                                    </div>
                                    <div class="flex items-center gap-x-3">
                                        <input id="push-email" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        <label for="push-email"
                                            class="block text-sm font-medium leading-6 text-gray-900">Same as
                                            email</label>
                                    </div>
                                    <div class="flex items-center gap-x-3">
                                        <input id="push-nothing" name="push-notifications" type="radio"
                                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        <label for="push-nothing"
                                            class="block text-sm font-medium leading-6 text-gray-900">No push
                                            notifications</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div> -->
            </div>

            <div class="mt-6 flex items-center justify-center gap-x-6">
                <!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Bat</button> -->

                <button 
                    type="submit"
                    :disabled="masalah.length === 0 || masalah.length > 5000"
                    :class="[
                        'flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                        masalah.length === 0 || masalah.length > 5000 ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-400 hover:bg-lime-5000'
                    ]"
                >
                    Buat Laporan
                </button>

            </div>
        </form>

    </div>
</template>

<script>
import { create_ticket_telecos_care } from '@/components/logic/API/pusat_bantuan';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
// import { get_user_data } from '@/components/logic/API/user';
export default {
    data() {
        return {
            judul_laporan: "",
            masalah: "", 
            userId: "",
            laporan_success: false
        }
    },
    mounted() { 
        this.getuser(); 
    },
    methods: { 
        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();
                if(sessionDetails === false){
                    this.$router.push({ name: 'akun' , params:{param_1 :'redirect-lapor-telecos-care', param_2: "redirect-lapor-telecos-care"}});
                }
                else{
                    this.userId = sessionDetails.userid;
                }
            } catch (error) {
                alert('Maaf, ada kesalahan pada sistem kami ', error);
            }
        },

        async send_laporan(){ 
            const respon = await create_ticket_telecos_care(this.userId, this.judul_laporan, this.masalah);
            if(respon.status==1){
                this.laporan_success = true;
                setTimeout(async () => {
                    this.laporan_success = false;
                    this.$router.push({ name: 'telecos_care' });
                }, 3000);
            }

        }

    },
}
</script>

<style></style>