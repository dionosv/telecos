<template>
    <div class="no_event">
        <div class="no_event_icon">
            <ion-icon name="calendar-outline" class="text-xl"></ion-icon>
        </div>
        <div class="no_event_text">
            <p>Tidak ada sesi</p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

.no_event{
    display: flex;
    /* justify-content: center; */
    flex-direction: row;
    align-items: center;
    gap: 1rem; 
}

.no_event p{
    padding: 0px;
    margin:0px;
}

.no_event_icon{
    height: 20px;
}
    
</style>