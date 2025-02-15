<template>

    <div id="all_semua" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div class="my_article">
            <h1 class="text-m font-bold tracking-tight text-gray-900 sm:text-3xl">Baca Artikel</h1>
            <router-link :to="{ name: 'lihat_artikel_saya_expert'}" v-if="expertId !== null"
                class="rounded-md bg-orange-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Lihat
                Artikel Saya</router-link>
        </div>

        <Spinner v-if="articles.length == 0"></Spinner>
        <div class="all_article" v-else>
            <Artikel_single_card v-for="article in articles" :key="article.id" :article="article" :redirect="'expert'">
            </Artikel_single_card>
        </div>
    </div>
</template>
<script>
import Artikel_single_card from '@/components/artikel/artikel_single_card.vue';
import { get_article_all } from '@/components/logic/API/artikel/artikel_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        Artikel_single_card, Spinner
    },
    data() {
        return {
            articles: [],
            expertId: null
        }
    },

    mounted() {
        this.getuser();
        this.get_all_articles();
    },

    methods: {
        async get_all_articles() {
            const result = await get_article_all();
            this.articles = result.articles; 
        },
        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails == false) {
                    this.$router.push({ name: 'akun_expert'});
                }

                else {
                    this.expertId = sessionDetails.userid;
                    // console.log('expertId', this.expertId);
                    // let data_user = await get_user_data(this.expertId);
                }
            }

            catch (error) {
                alert('Maaf, ada kesalahan pada sistem kami ', error);
            }
        }

    }
}
</script>
<style scoped>
.my_article {
    display: flex;
    justify-content: space-between;

    align-items: center;

    margin-top: 20px;
    margin-bottom: 30px;
}

.all_article {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    overflow-x: hidden;
    /* padding: 20px; */
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
    .all_article {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {
    .all_article {
        grid-template-columns: repeat(2, 1fr);
        margin-left: 10px;
        margin-right: 10px;

    }
}

@media (max-width: 600px) {
    .all_article {
        grid-template-columns: 1fr;
    }
}
</style>