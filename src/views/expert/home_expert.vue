<template>
    <!-- home view for expert --> 
    <banner_akun_expertHome></banner_akun_expertHome>
    <div id="all" class="mx-auto max-w-7xl   fade-in">
        <Home_expert_carousel id="carousel_expert"></Home_expert_carousel>
        <Bigmenu_expert id="bigmenu_expert"></Bigmenu_expert>
    </div>



</template>
<script>

import banner_akun_expertHome from '@/components/banner/banner_akun_expert Home.vue';
import Home_expert_carousel from '@/components/carousel/home_expert_carousel.vue';
import Bigmenu_expert from '@/components/home_widget/bigmenu_expert.vue';

export default {
    components: {
        Home_expert_carousel,
        banner_akun_expertHome,
        Bigmenu_expert
    },
    data() {
        return {

        }
    },

}
</script>
<style>

#carousel_expert{
    margin-top: 40px; 
    margin-bottom: 40px;
}

#bigmenu_expert{
    margin-top: 40px; 
    margin-bottom: 40px;
}

</style>