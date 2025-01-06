<template>
    <div>
        <!-- <Kalender_2></Kalender_2> -->

        <kalender></kalender>
    </div>
</template>
<script>
import kalender from '@/components/kalender/kalender.vue'; 
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';

export default {
    mounted() { 
        always_scroll_on_top();
    },
    components: {
        kalender, 
    },
    methods: {
        
    },


}
</script>
<style></style>