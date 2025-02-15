<template>

    <div id="all_semua" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <div class="my_article">
            <h1 class="text-m font-bold tracking-tight text-gray-900 sm:text-3xl">Baca Artikel</h1>
        </div>

        <Spinner v-if="articles.length === 0"></Spinner>
        <div class="all_article" v-else>
            <Artikel_single_card v-for="article in articles" :key="article.id" :article="article" :redirect="'user'">
            </Artikel_single_card>

        </div>
    </div>
</template>
<script>
import Artikel_single_card from '@/components/artikel/artikel_single_card.vue';
import { get_article_all } from '@/components/logic/API/artikel/artikel_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    components: {
        Artikel_single_card, Spinner
    },
    data() {
        return {
            articles: []
        }
    },

    mounted() {
        this.get_all_articles();
    },

    methods: {
        async get_all_articles() {
            const result = await get_article_all();
            this.articles = result.articles;

            // console.log(this.articles);
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