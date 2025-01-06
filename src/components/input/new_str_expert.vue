<template>
    <div class="email-container relative">
        <div class="relative rounded-md shadow-sm" id="email_blocked">
            <input type="email" 
                name="email" 
                id="no_str"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :value="no_str"  
                maxlength="6"
                 />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        parent_component_email: {
            type: String,
            required: false
        }
    },
    data() {
        return { 
            no_str: ''
        }
    },
    mounted() {
        this.no_str = this.parent_component_email
    },
    watch: {
        parent_component_email(newVal) {
            this.no_str = newVal
        }
    }
}
</script>

<style> 
#no_str { 
    pointer-events: none;
}

.email-container {
    position: relative;
}
 
</style>