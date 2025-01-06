<template>
    <div class="relative rounded-md shadow-sm">
        <input type="email" 
            name="email" 
            id="email_baru"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="modelValue"
            @input="handleInput($event)"
            placeholder="dion.hananto14@gmail.com" />
            
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_email">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>
        
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_email_check">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
        </div>
    </div>
    
    <div class="email_error" v-if="toogle_email">
        <p class="mt-2 text-sm text-red-600">Format email tidak valid.</p>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        emailInUse: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'email_status'],
    data() {
        return {
            toogle_email: false,
            toogle_email_check: false
        }
    },
    methods: {
        handleInput(e) {
            const value = e.target.value.trim().toLowerCase()
            this.$emit('update:modelValue', value)
            this.validate_email(value)
        },
        validate_email(value) {
            const rules = {
                basic: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z0-9]+([.-]?[a-z0-9]+)*\.[a-z]{2,}$/,
                length: value.length <= 254,
                localLength: value.split('@')[0]?.length <= 64,
                noMultipleDots: !/\.{2,}/.test(value),
                noMultipleDashes: !/-{2,}/.test(value),
                noMultipleUnderscores: !/_{2,}/.test(value),
                noSpecialSequences: !/[._-]{2,}/.test(value),
                validStart: /^[a-z0-9]/.test(value),
                validEnd: /[a-z0-9]@/.test(value),
                simpleFormat: /^[a-z0-9][a-z0-9._-]*[a-z0-9]@[a-z0-9][a-z0-9.-]*[a-z0-9]\.[a-z]{2,}$/.test(value),
                maxDotsLocal: (value.split('@')[0]?.match(/\./g) || []).length <= 2,
                noConsecutiveSpecials: !/[._-][._-]/.test(value)
            }

            let isValid = false
            
            if (value.length === 0) {
                this.toogle_email = false
                this.toogle_email_check = false
                this.$emit('email_status', null)
            } else {
                isValid = Object.values(rules).every(rule => rule)
                this.toogle_email = !isValid
                this.toogle_email_check = isValid
                this.$emit('email_status', isValid)
            }
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newVal) {
                this.validate_email(newVal)
            }
        }
    }
}
</script>

<style> 
.new_email_error {
    margin-top:15px;
    animation: flashIn 1s ease-in-out;
}

#email_icon {
    animation: flashIn 0.5s ease-in-out;
}

@keyframes flashIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
</style>