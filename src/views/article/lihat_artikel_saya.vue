<template>
    <div id="all_semua" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="my_article">
            <h1 class="text-m font-bold tracking-tight text-gray-900 sm:text-3xl">Daftar Artikel</h1>
        </div>

        <div v-if="loading"> 
            <Spinner></Spinner>
        </div>

        <div v-else-if="error" class="text-center py-4 text-red-600">
            {{ error }}
        </div>

        <ul v-else role="list" class="divide-y divide-gray-100">
            <li v-for="article in articles" :key="article.articleId" class="relative py-5 hover:bg-gray-50">

                <router-link :to="{name : 'single_page_article_admin', params : {'articleId' : article.articleId}}">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto flex justify-between gap-x-6">
                        <div class="flex min-w-0 gap-x-4">
                            <div class="min-w-0 flex-auto">
                                <p class="text-sm font-semibold leading-6 text-gray-900">
                             
                                        <span class="inset-x-0 -top-px bottom-0" />
                                        {{ article.title }}
                                    
                                </p>
                                <p class="mt-1 flex items-center gap-4 text-xs leading-5 text-gray-500" id="bottom_text">
                                    <!-- <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                                        :class="{
                                            'bg-gray-100 text-gray-600': article.status === 'published',
                                            'bg-pink-100 text-pink-600': article.status === 'waiting'
                                        }">
                                        {{ article.status === 'published' ? 'Terpublikasi' : 'Pending' }}
                                    </span> -->
                                    <span>{{ formatDate(article.date) }}</span>
                                    <!-- <span class="text-gray-500">Kategori: {{ article.category }}</span> -->
                                    <span class="text-gray-500">Views: {{ article.viewCount }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="flex shrink-0 items-center gap-x-4">
                            <div class="hidden sm:flex sm:flex-row sm:gap-4 sm:items-end">
                                <router-link :to="{ name: 'edit_artikel_admin', params: { articleId: article.articleId }}"
                                    class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Edit Artikel
                                </router-link>
                                <button @click="confirmDelete(article.articleId)" type="button"
                                    class="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    Hapus Artikel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { delete_artikel, get_article_all, get_article_by_expert_id } from '@/components/logic/API/artikel/artikel_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/admin/admin_save_session_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    data() {
        return {
            expertId: null,
            articles: [],
            loading: true,
            error: null
        }
    },

    components: {
        Spinner
    },

    mounted() {
        this.getuser();
    },

    methods: {
        async getuser() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.load_admin_telecos();

                if (!sessionDetails) {
                    this.$router.push({ name: 'akun_admin' });
                    return;
                }

                this.expertId = sessionDetails.userid;
                await this.get_article_by_expert();
            } catch (error) {
                this.error = 'Gagal memuat data pengguna';
                console.error(error);
            }
        },

        async get_article_by_expert() {
            try {
                this.loading = true;
                const hasil = await get_article_all();

                console.log(hasil);
                
                if (hasil.status === 1 && Array.isArray(hasil.articles)) {
                    this.articles = hasil.articles;
                    console.log(this.articles);
                } else {
                    this.error = 'Data artikel tidak valid';
                }
            } catch (error) {
                this.error = 'Gagal memuat artikel';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        formatDate(dateString) {
            try {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('id-ID', options);
            } catch {
                return dateString;
            }
        },

        async confirmDelete(articleId) {
            await delete_artikel(articleId)

            await this.get_article_by_expert();
        }
    }
}
</script>

<style>
.my_article {
    display: flex;
    justify-content: space-between;

    align-items: center;

    margin-top: 20px;
    margin-bottom: 30px;
}
</style>