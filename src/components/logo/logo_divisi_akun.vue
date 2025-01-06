<template>

<div class="centering_logo">
    <router-link :to="{ name: 'home'}" id="telecos_fine_logo">telecos</router-link>  
</div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
@import '/src/assets/custom font/custom_font.css';

.centering_logo {
    display: flex;
    justify-content: center;
    align-items: center; 
}

#telecos_fine_logo {
    font-family: 'Sora-Bold';
    font-size: 34px;
    color: black;
    letter-spacing: -1px;
    user-select: none;
    text-align: center;
}

</style>