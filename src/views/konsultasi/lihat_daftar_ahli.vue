<template>
    <div class="mx-auto max-w-7xl items-center p-6 lg:px-8 ">
        <div class="daftar_ahli">

            <div v-if="loading"
                class="grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                        class="text-gray-900">
                    </path>
                </svg>
            </div>
            <div class="all" v-else-if="!loading" style="min-height: 100vh;">
                <ahli_filter 
                    :descriptions="uniqueDescriptions" 
                    @search="handleSearch"
                    @filter="handleFilter">
                </ahli_filter>

                <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" v-if="hitung_jumlah_ahli>=0">
                    <ahli_contact_card 
                        v-for="ahli in filteredAhliList" 
                        :key="ahli.expertId" 
                        :ahli="ahli"
                        @update:ahli="updateAhli($event)">
                    </ahli_contact_card>
                </ul>

                <div v-if="hitung_jumlah_ahli==0" class="not_found">
                    <ion-icon name="alert-circle"></ion-icon>
                    <p class="s_query">Tidak ada ahli yang ditemukan dengan kata kunci {{ searchQuery }}</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import ahli_contact_card from '@/components/ahli/ahli_contact_card.vue';
import ahli_filter from '@/components/ahli/ahli_filter.vue';
import { get_all_experts } from '@/components/logic/API/experts';
import { get_fav_by_user_id } from '@/components/logic/API/favourite';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';

export default {
    components: {
        ahli_contact_card,ahli_filter
    },
    created(){
        this.scroll_to_top();
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
            favoriteExpertIds: [],
            searchQuery: '',
            activeFilters: [],
            hitung_jumlah_ahli: 0,
            searchCache: new Map(),
            searchTimeout: null,
            processedAhliList: []
        }
    },
    watch: {
        ahliList: {
            immediate: true,
            handler(newList) {
                this.processedAhliList = newList.map(ahli => ({
                    ...ahli,
                    searchableText: ahli.name.toLowerCase()
                }));
            }
        }
    },
    computed: {
        uniqueDescriptions() {
            return [...new Set(this.ahliList.map(ahli => ahli.description))];
        },
        filteredAhliList() {
            const searchQuery = this.searchQuery.toLowerCase();
            const filteredList = this.processedAhliList.filter(ahli => { 
                if (!searchQuery && this.activeFilters.length === 0) {
                    return true;
                }
                const nameMatch = !searchQuery || 
                    ahli.searchableText.includes(searchQuery);

                const filterMatch = this.activeFilters.length === 0 || 
                    this.activeFilters.includes(ahli.description);

                return nameMatch && filterMatch;
            });
 
            this.hitung_jumlah_ahli = filteredList.length;

            return filteredList;
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
                firstJob: new Date().getFullYear() - new Date(expert.firstJob).getFullYear(),
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

                if (sessionDetails.phase == 1) {
                    this.isLogin = true;
                    this.userId = sessionDetails.userid;
                    await this.get_data_fav();
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
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
        },
        scroll_to_top() {
            window.scrollTo({
                top: 0,
            });
        },
        handleSearch(query) {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            this.searchTimeout = setTimeout(() => {
                this.searchQuery = query.trim();
                this.searchCache.clear();
            }, 300);
        },
        handleFilter(filters) {
            this.activeFilters = [...filters];
            this.searchCache.clear();
        },
        beforeDestroy() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            this.searchCache.clear();
        }
    }
}
</script>
<style>
.not_found {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 200px;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
}

.not_found ion-icon {
    font-size: 3rem;
    color: #666;
}

.not_found .s_query {
    font-size: 1.25rem;
    color: #666;
    max-width: 100%;
    word-wrap: break-word;
}

@media screen and (max-width: 768px) {
    .not_found {
        min-height: 150px;
        padding: 1.5rem;
    }

    .not_found ion-icon {
        font-size: 2.5rem;
    }

    .not_found .s_query {
        font-size: 1rem;
        padding: 0 1rem;
        line-height: 1.5;
    }
}

@media screen and (max-width: 480px) {
    .not_found {
        min-height: 120px;
        padding: 1rem;
    }

    .not_found ion-icon {
        font-size: 2rem;
    }

    .not_found .s_query {
        font-size: 0.875rem;
    }
}
</style>