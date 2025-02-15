<template>

    <Spinner v-if="data_loaded === null"></Spinner>

    <div id="all" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="data_loaded === true">

        <div class="text-header">
            <h1 class="header-title">
                {{ artikel.article_title }}
            </h1>
        </div>

        <div class="author_handler">
            Artikel ini di unggah pada
            {{ new Date(artikel.article_date).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year:
                    'numeric'
            }) }}, pukul
            {{ new Date(artikel.article_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }} WIB
        </div>

        <div class="tag_handler">
            <span v-if="this.artikel.article_category == 'penyakit'"
                class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Penyakit</span>
            <span v-if="this.artikel.article_category == 'diet & nutrisi'"
                class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Diet
                & Nutrisi</span>
            <span v-if="this.artikel.article_category == 'kesehatan'"
                class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Kesehatan</span>
            <span v-if="this.artikel.article_category == 'makanan sehat'"
                class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">Makanan
                Sehat</span>
            <span v-if="this.artikel.article_category == 'kecantikan'"
                class="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">Kecantikan</span>

            <div class="view_count">
                <ion-icon name="eye-outline"></ion-icon>
                <p class="view_value">{{ artikel.view_count + 1}}</p>
            </div>
        </div>



        <div class="add_image">
            <Image_carousel :articleId="article_id"></Image_carousel>
        </div>

        <div class="text_print_out_area">
            <div ref="quillViewer"></div>
        </div>
    </div>

    <div id="article_not_found" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="data_loaded === false">
        <main class="flex w-full max-w-7xl flex-auto flex-col justify-center py-24 sm:py-64">
            <p class="text-base font-semibold leading-8 text-lime-600">Mohon maaf, </p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Artikel tidak di temukan</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">Periksa kembali id artikel
                <span class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{article_id}}</span>
            </p>


            <div class="mt-10">
                <router-link :to="{ name: 'landing_page_artikel' }" class="text-sm font-semibold leading-7 text-lime-600">
                    Baca artikel lainnya
                </router-link>
            </div>
        </main>
    </div>


</template>
<script>
import Image_carousel from '@/components/image/image_carousel.vue';
import { get_article_by_id } from '@/components/logic/API/artikel/artikel_service';
import { get_experts_byID } from '@/components/logic/API/experts_service';
import Spinner from '@/components/spinner/spinner.vue';
import Quill from "quill";

export default {
    mounted() {
        this.article_id = this.$route.params.articleId;
        this.try_get_article_data_by_id();
    },
    props: {
        articleId: {
            type: String,
            default: () => [],
            required: false
        },
    },
    components: {
        Spinner, Image_carousel
    },
    data() {
        return {
            author_name: "",
            article_id: "",
            artikel: {
                article_title: "",
                article_content: "",
                article_author: "",
                article_author_type: "",
                article_date: "",
                article_category: "",
                article_image: "",
                article_status: "",
                view_count:0
            }
            ,
            data_loaded: null
        }
    },
    watch: {
        articleId: {
            immediate: true,
            handler(newVal) {
                this.article_id = newVal;
            }
        },
        'artikel.article_content': {
            handler(newContent) {
                if (newContent) {
                    this.$nextTick(() => {
                        this.initQuillViewer();
                    });
                }
            }
        }
    },
    methods: {
        initQuillViewer() {
            const quillViewer = new Quill(this.$refs.quillViewer, {
                theme: 'bubble',
                readOnly: true,
                modules: {
                    toolbar: false
                }
            });

            if (typeof this.artikel.article_content === 'string') {
                quillViewer.root.innerHTML = this.artikel.article_content;
            } else {
                quillViewer.setContents(this.artikel.article_content);
            }
        },

        async try_get_article_data_by_id() {
            try {
                const artikel = await get_article_by_id(this.article_id)
                if (artikel.status == 1) {
                    this.artikel.article_author = artikel.articles[0].authorId;
                    this.artikel.article_author_type = artikel.articles[0].authorType;
                    this.artikel.article_category = artikel.articles[0].category;
                    this.artikel.article_content = artikel.articles[0].content;
                    this.artikel.article_date = artikel.articles[0].date;
                    this.artikel.article_title = artikel.articles[0].title;
                    this.artikel.artikel_status = artikel.articles[0].status;
                    this.artikel.view_count = artikel.articles[0].viewCount;

                    // console.log(this.artikel.article_category);
                    await this.get_author(this.artikel.article_author_type, this.artikel.article_author);
                    this.data_loaded = true;
                    this.$nextTick(() => {
                        this.initQuillViewer();
                    });
                }
                else {
                    this.data_loaded = false;
                    // console.log("Artikel tidak di temukan")
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        async get_author(author_type, author_id) {
            try {

                if (author_type == "expert") {
                    const nama_author = await get_experts_byID(author_id);
                    this.author_name = nama_author.user.name
                }

            } catch (error) {

            }
        }
    }


}
</script>
<style>
@import '//cdn.quilljs.com/1.3.6/quill.bubble.css';

.text_print_out_area {
    margin: 20px 0;
}

.ql-editor {
    padding: 0px;
    
}

.view_count{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-left: 3px;
}
.view_count p{
    font-size: 0.8rem;
    color: #333;
}

div.text-header h1.header-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    color: #333;
    margin-bottom: 1rem;
    margin-top: 1rem;
    /* text-align: center; */
}

.author_handler {
    font-size: 0.8rem;
    font-weight: 400;
    color: #333;
    margin-bottom: 1rem;
}

.add_image{
    margin-top: 3rem;
    margin-bottom: 3rem;
}
</style>