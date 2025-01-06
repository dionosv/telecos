<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div class="availability">
            <!-- <ion-icon name="cog"></ion-icon> -->
            <h1 class="text-m font-bold tracking-tight text-gray-900 sm:text-3xl">Atur Waktu Konsultasi</h1>
        </div>
        <Kalender_available_expert></Kalender_available_expert>
    </div>
</template>
<script>
import Kalender_available_expert from '@/components/kalender/kalender_available_expert.vue';

export default {
    components: {
        Kalender_available_expert
    }


}
</script>
<style>
.availability{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.availability h1{
    margin-left: 10px;
    font-size: 25px;
    font-weight: 600;
}
.availability ion-icon{
    font-size: 35px;
    /* color: #4F46E5; */
}
</style>