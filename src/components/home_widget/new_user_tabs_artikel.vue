<template>
    <div class="all_artikel_home">
        <div class="all_article">
            <Artikel_single_card
                v-for="article in limitedArticles" 
                :key="article.id"
                :article="article"
                :redirect="'user'"
            ></Artikel_single_card>
        </div>
    </div>
</template>
<script>
import Artikel_single_card from '../artikel/artikel_single_card.vue';
import { get_article_all } from '@/components/logic/API/artikel/artikel';

export default {
    components: { 
        Artikel_single_card
    },
    data() {
        return {
            articles: []
        }
    },
    computed: {
        limitedArticles() {
            return this.articles.slice(0, 5);
        }
    },
    mounted() {
        this.get_all_articles();
    },
    methods: {
        async get_all_articles() {
            const result = await get_article_all();
            this.articles = result.articles;
        }
    }
}
</script>
<style>

.all_artikel_home{
    width: 1000px;
    overflow: hidden;
    position: relative;
}

.all_article {
    display: flex;
    gap: 10px;
    overflow-x: auto; 
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    padding-bottom: 10px; /* Add space for scrollbar */
}

.all_article > * {
    flex: 0 0 auto; /* Prevent shrinking */
}
  
.single_card{ 
    width: 300px;
}

/* Add gradient masks */
.all_artikel_home::before,
.all_artikel_home::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30px; /* Reduced from 50px to 30px */
    pointer-events: none;
    z-index: 1;
}

.all_artikel_home::before {
    left: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0));
}

.all_artikel_home::after {
    right: 0;
    background: linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0));
}

@media screen and (max-width: 768px) {
    .all_artikel_home {
        width: 100%;
        padding: 0 15px;
    }

    .all_article {
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        gap: 10px;
    }

    .single_card {
        width: 100%;
    }

    /* Remove gradient masks on mobile */
    .all_artikel_home::before,
    .all_artikel_home::after {
        display: none;
    }
}
</style>