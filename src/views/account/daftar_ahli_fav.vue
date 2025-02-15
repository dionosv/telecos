<template>
    <div class="mx-auto max-w-7xl items-center p-3 sm:p-6 lg:px-8">
        <div class="daftar_ahli">
            <Spinner v-if="loading"></Spinner>
            <div class="list_ahli_fav" v-else>
                <span id="title_ahli_fav" class="px-2 sm:px-0">
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Daftar Ahli Favorit</h1>
                    <ion-icon id="red_heart" name="heart"></ion-icon>
                </span>

                <ul role="list"
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-0">
                    <ahli_contact_card v-for="(ahli, index) in filteredAhliList" :key="index" :ahli="ahli"
                        @update:ahli="updateAhli(index, $event)"></ahli_contact_card>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import ahli_contact_card from '@/components/ahli/ahli_contact_card.vue';
import { get_all_experts } from '@/components/logic/API/experts_service';
import { get_fav_by_user_id } from '@/components/logic/API/favourite_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        ahli_contact_card,
        Spinner
    },
    mounted() {
        this.initializeData();
    },
    data() {
        return {
            ahliList: [],
            loading: true,
            userId: "",
            isLogin: false,
            favoriteExpertIds: []
        }
    },
    computed: {
        filteredAhliList() {
            return this.ahliList.filter(ahli => ahli.isFavorite);
        }
    },
    methods: {
        async initializeData() {
            this.loading = true;
            try {
                await this.try_get_session();
                await this.get_data_ahli();
            } finally {
                this.loading = false;
            }
        },
        updateAhli(index, updatedAhli) {
            this.ahliList[index] = updatedAhli;
        },
        async get_data_ahli() {
            const list_ahli = await get_all_experts();
            if (list_ahli.status === 1) {
                this.processExperts(list_ahli.experts);
            }
        },
        processExperts(experts) {
            this.ahliList = experts.map(expert => ({
                expertId: expert.expertId,
                name: expert.name,
                description: expert.description,
                firstJob: "1994-08-07T17:00:00.000Z",
                isLogin: this.isLogin,
                user_id: this.userId,
                isFavorite: this.favoriteExpertIds.includes(expert.expertId),
                imageName : expert.imageName
            }));
        },
        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) { 
                    this.$router.push({ name: 'akun', params: { param_1: 'redirect-daftar-ahli-favorit', param_2: 'redirect-daftar-ahli-favorit' } });
                }

                else {
                    if (sessionDetails.phase == 1) {
                        this.isLogin = true;
                        this.userId = sessionDetails.userid;
                        await this.get_data_fav();
                    }

                    if (!sessionDetails) {
                        this.$router.push({ name: 'home' });
                    }

                }

            } catch (error) {
                console.error('Failed to load session details:', error);
                this.$router.push({ name: 'home' });
            }
        },
        async get_data_fav() {
            if (this.isLogin == true) {
                try {
                    const hasil = await get_fav_by_user_id(this.userId);
                    if (hasil.status === 1 && hasil.favour) {
                        this.favoriteExpertIds = hasil.favour.map(fav => fav.expertId);
                        this.processExperts(this.ahliList);
                    }
                } catch (error) {
                    console.error('Failed to get favourites detail lists: ', error);
                }
            }
        }
    }
}
</script>
<style>
div.daftar_ahli div.list_ahli_fav span#title_ahli_fav h1 {
    font-size: clamp(20px, 5vw, 25px);
}

span#title_ahli_fav ion-icon {
    font-size: clamp(20px, 5vw, 25px);
    color: red;
}

span#title_ahli_fav {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 8px;
}

@media (min-width: 640px) {
    span#title_ahli_fav {
        margin-bottom: 25px;
        gap: 10px;
    }
}
</style>