<template>
    <div>

        <router-link 
         
        :to="redirect === 'expert' 
            ? { name: 'single_page_article_expert', params: { articleId: article.articleId } } 
            : { name: 'single_page_article', params: { articleId: article.articleId } }">

            <article class="single_card">
                <div class="image_card">
                    <img :src="article.imageName" :alt="article.title">
                </div>

                <div class="bottom_card">
                    <div class="tag_handler"> 
                        <span v-if="article.category == 'penyakit'"
                            class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Penyakit</span>
                        <span v-else-if="article.category == 'diet & nutrisi'"
                            class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Diet
                            & Nutrisi</span>
                        <span v-else-if="article.category == 'kesehatan'"
                            class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Kesehatan</span>
                        <span v-else-if="article.category == 'makanan sehat'"
                            class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">Makanan
                            Sehat</span>
                        <span v-else-if="article.category == 'kecantikan'"
                            class="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">Kecantikan</span>
                    </div>

                    <div class="article_title">
                        <h1 id="judul_berita">
                            {{ article.title }}
                        </h1>
                    </div>

                    <div class="split_bottom">
                        <div class="waktu_artikel">
                            <p>{{ new Date(article.date).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'long', year:
                                    'numeric' }) }}</p>
                        </div>

                        <div class="hidden_logo_telecos" v-if="redirect == 'user'">


                            <div class="logo_telecos" id="penyakit" v-if="article.category == 'penyakit'">
                                <ion-icon name="newspaper-outline"></ion-icon>
                                <span class="logo">telecos</span>
                            </div>

                            <div class="logo_telecos" id="diet_nutrisi" v-if="article.category == 'diet & nutrisi'">
                                <ion-icon name="newspaper-outline"></ion-icon>
                                <span class="logo">telecos</span>
                            </div>

                            <div class="logo_telecos" id="kesehatan" v-if="article.category == 'kesehatan'">
                                <ion-icon name="newspaper-outline"></ion-icon>
                                <span class="logo">telecos</span>
                            </div>

                            <div class="logo_telecos" id="makanan_sehat" v-if="article.category == 'makanan sehat'">
                                <ion-icon name="newspaper-outline"></ion-icon>
                                <span class="logo">telecos</span>
                            </div>

                            <div class="logo_telecos" id="kecantikan" v-if="article.category == 'kecantikan'">
                                <ion-icon name="newspaper-outline"></ion-icon>
                                <span class="logo">telecos</span>
                            </div>

                        </div>

                        <div class="logo_telecos" id="expert" v-if="redirect == 'expert'">
                            <ion-icon name="newspaper-outline"></ion-icon>
                            <span class="logo">telecos</span>
                        </div>
                    </div>
                </div>
            </article>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        article: {
            type: Object,
            required: true,
            default: () => ({
                title: '',
                image_url: '',
                category: '',
                created_at: '',
                id: ''
            })
        },
        redirect: {
            type: String,
            required: true,
            default: ''
        }
    }
}
</script>
<style>
@import '/src/assets/custom font/custom_font.css';

.single_card {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    /* reduced from 12px */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-bottom: 16px;
    /* reduced from 24px */
    padding: 8px;
    /* reduced from 12px */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 15px;
}

.single_card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.single_card:hover .image_card img {
    transform: scale(1.1);
}

.image_card {
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 8px;
    width: 100%;
    height: 150px;
    position: relative;
}

.image_card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
}

div.split_bottom {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

div.bottom_card div.logo_telecos span.logo {
    font-family: 'Sora-Bold';
    font-size: 16px;
    /* color: black; */
    letter-spacing: -1px;
    user-select: none;
    text-align: center;
}

div.logo_telecos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
}

div.logo_telecos#expert {
    color: rgb(234, 88, 12)
}

div.hidden_logo_telecos div#penyakit.logo_telecos {
    color: rgb(185 28 28);
}

div.hidden_logo_telecos div#diet_nutrisi.logo_telecos {
    color: rgb(133 77 14);
}

div.hidden_logo_telecos div#kesehatan.logo_telecos {
    color: rgb(21 128 61);
}

div.hidden_logo_telecos div#makanan_sehat.logo_telecos {
    color: rgb(126 34 206);
}

div.hidden_logo_telecos div#kecantikan.logo_telecos {
    color: rgb(190 24 93);
}


div.bottom_card div.split_bottom div.logo_telecos ion-icon.md.hydrated {
    font-size: 16px;
}

.bottom_card {
    padding-top: 6px;
}

.tag_handler {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    /* reduced from 8px */
    margin-bottom: 8px;
    /* reduced from 12px */
}

.article_title {
    margin: 8px 0;
    /* reduced from 12px */
}

.article_title h1 {
    font-size: 1rem;
    /* reduced from 1.25rem */
    font-weight: 600;
    line-height: 1.3;
    /* reduced from 1.4 */
    color: #1a202c;
}

.waktu_artikel {
    font-size: 0.7rem;
    color: #718096;
}

@media (max-width: 768px) {
    .image_card img {
        width: 100%;
        height: 100%;
    }

    .article_title h1 {
        font-size: 1.25rem;
        /* reduced from 1.5rem */
    }
}
</style>