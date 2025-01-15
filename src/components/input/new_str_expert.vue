<template>
    <div class="email-container relative">
        <div class="relative rounded-md shadow-sm" id="str_set">
            <input type="text" 
                name="str" 
                id="no_str"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model="no_str"  
                @input="validateInput"
                maxlength="6"
                placeholder="Masukkan 6 digit nomor STR"
                 />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ion-icon name="checkmark-circle"  class="text-xl fill-green-500" v-if="isValid"></ion-icon>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return { 
            no_str: '',
            isValid: false
        }
    },
    methods: {
        validateInput(event) {
            // Remove any non-numeric characters
            this.no_str = this.no_str.replace(/\D/g, '');
            
            this.isValid = this.no_str.length === 6;
            this.$emit('update:modelValue', this.no_str);
            this.$emit('str_status', this.isValid);
        }
    },
    watch: {
        modelValue(newVal) {
            this.no_str = newVal;
        }
    },
    mounted() {
        this.no_str = this.modelValue;
        this.$emit('str_status', this.no_str.length === 6);
    }
}
</script>

<style> 
.email-container {
    position: relative;
}
 
</style>