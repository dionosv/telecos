<template>
    <div class="relative rounded-md shadow-sm">
        <input type="tel" 
            name="telephone" 
            id="telephone_baru"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="telephone_baru"
            @input="handleInput($event)"
            @keypress="blockNonNumeric"
            placeholder="6281234567890" 
            maxlength="15" />

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_telephone">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_telephone_check">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
        </div>
    </div>

    <div class="telephone_error" v-if="toogle_telephone">
        <p class="mt-2 text-sm text-red-600">Format nomor telepon tidak valid.</p>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_telephone: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            toogle_telephone: false,
            toogle_telephone_check: false,
            telephone_baru: ''
        }
    },
    mounted() {
        this.telephone_baru = this.parent_component_telephone
        this.validate_telephone()
    },
    watch: {
        parent_component_telephone(newVal) {
            this.telephone_baru = newVal
            this.validate_telephone()
        },
        telephone_baru: {
            handler(newVal) {
                this.validate_telephone()
            },
            immediate: true
        }
    },
    emits: ['update:parent_component_telephone', 'telephone_status'],
    methods: {
        blockNonNumeric(e) {
            // Prevent backspace/delete if it would affect "62" prefix
            if (e.key === 'Backspace' || e.key === 'Delete') {
                const selectionStart = e.target.selectionStart
                if (selectionStart <= 2) {
                    e.preventDefault()
                    return
                }
            }
            
            // Only allow numbers
            if (!/^\d$/.test(e.key)) {
                e.preventDefault()
            }
        },
        handleInput(e) {
            let value = e.target.value.replace(/[^\d]/g, '')
            
            // Always ensure 62 prefix
            if (!value.startsWith('62')) {
                if (value.startsWith('0')) {
                    value = '62' + value.slice(1)
                } else {
                    value = '62' + value
                }
            }
             
            
            this.telephone_baru = value.slice(0, 15)
            
            this.validate_telephone()
        },
        validate_telephone() {
            if (!this.telephone_baru || this.telephone_baru.length < 4) {
            this.toogle_telephone = false
            this.toogle_telephone_check = false
            this.$emit('telephone_status', null)
            return
            }

            const phoneRegex = /^62[1-9][0-9]{8,10}$/
            const isValid = phoneRegex.test(this.telephone_baru)

            this.toogle_telephone = !isValid
            this.toogle_telephone_check = isValid
            this.$emit('telephone_status', isValid)
            this.$emit('update:parent_component_telephone', this.telephone_baru)
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