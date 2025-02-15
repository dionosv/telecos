<template>
    <div class="all_single_card">
        <li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div class="flex flex-1 flex-col p-8">
                <img class="mx-auto h-36 w-36 flex-shrink-0 rounded-full fly-in" :src=image alt="" loading="lazy">
             <h3 class="mt-6 text-sm font-medium text-gray-900">{{ ahli.name }}</h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                    <dd class="text-sm text-gray-500">{{ ahli.description }}</dd>
                    <!-- <dd class="text-sm text-gray-500">{{ ahli.isFavorite }}</dd> -->

                    <dd class="mt-3 min-h-7" >
                        <span v-if="ahli.firstJob>=5" class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 min-h-7">
                            <ion-icon name="bag-remove"></ion-icon>
                            <span class="ml-1">
                                {{ahli.firstJob}} tahun
                            </span>
                        </span>
                    </dd>
                </dl>
            </div>
 
            <div class="logged_in" v-if="islogin">
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="flex w-0 flex-1" id="favourited" v-if="fav_status == true" @click="handle_unfav()">
                        <button
                            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold">
                            <ion-icon name="heart" class="text-red"></ion-icon>
                            <p>
                                Favorit
                            </p>
                        </button>
                    </div>

                    <div class="flex w-0 flex-1" v-else-if="fav_status == false" @click="handle_fav()">
                        <button
                            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold">
                            <ion-icon name="heart-outline"></ion-icon>
                            Favorit
                        </button>
                    </div>

                    <div class="-ml-px flex w-0 flex-1">
                        <button @click="handle_konsultasi"
                            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            <ion-icon name="videocam-outline"></ion-icon>
                            Konsultasi
                        </button>
                    </div>
                </div>
            </div>
            <div class="not_logged_in" v-else>
                <div class="-mt-px flex">
                    <div class="-ml-px flex w-0 flex-1">
                        <button @click="handle_not_logged_in()"
                            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            <ion-icon name="videocam-outline"></ion-icon>
                            Konsultasi
                    </button>
                    </div>
                </div>
            </div>
        </li>
    </div>
</template>
<script>
import { create_favourite, remove_favourite } from '../logic/API/favourite_service';
import { expert_profile_picture } from '../logic/API/image_processor_service';

export default {
    mounted() {
        // console.log(this.expertId);
        // console.log(this.image);
    },
    props: {
        ahli: {
            type: Object,
            required: true
        }, 
    },
    watch: {
        ahli: {
            handler(newVal) {
                this.$emit('update:ahli', newVal);
            },
            deep: true
        }
    },
    data() {
        return {
            expertId: this.ahli.expertId,
            islogin: this.ahli.isLogin,
            user_id: this.ahli.user_id,
            fav_status: this.ahli.isFavorite,
            image : expert_profile_picture(this.ahli.imageName)
        }
    },
    methods:{
        async handle_unfav(){
            this.fav_status = false;
            await remove_favourite(this.user_id, this.expertId);
        }, 

        async handle_fav(){
            this.fav_status = true;
            await create_favourite(this.user_id, this.expertId);
        },
        async handle_konsultasi(){
            this.$router.push({ name: 'detail_expert_id', params: { expertId: this.expertId } });
        },
        async handle_not_logged_in(){
            this.$router.push({ name: 'akun' , params:{param_1 :'redirect-to-ahli', param_2: this.expertId}});
        }
    }
}
</script>
<style>
div.daftar_ahli div.logged_in div#favourited button {
    color: red;
}

ion-icon{
    font-size: 20px;
}

.all_single_card {
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-drag: none;
}

.fly-in {
    animation: flyIn 1.5s ease-in-out;
}

@keyframes flyIn {
    0% { 
        opacity: 0; 
        transform: translateY(10%);
    }
    100% { 
        opacity: 1; 
        transform: translateY(0);
    }
}
</style>