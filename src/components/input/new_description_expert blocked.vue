<template>
    <div class="email-container relative">
        <div class="relative rounded-md shadow-sm" id="email_blocked">
            <input type="email" 
                name="email" 
                id="no_str"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :value="no_str"  
                :disabled="true" />

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
            </div>
        </div>
        <div class="tooltip">
            Hubungi Telecos Care untuk mengubah Jenis Ahli
        </div>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_email: {
            type: String,
            required: true
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

.tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
}

.tooltip::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(0, 0, 0, 0.8);
}

.email-container:hover .tooltip {
    opacity: 1;
    visibility: visible;
    bottom: -35px;
}

.email-container:hover .hover-content {
    display: block;
}

.hover-content {
    margin-top: 0.5rem;
}
</style>