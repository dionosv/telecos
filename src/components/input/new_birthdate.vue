<template>
    <div class="relative rounded-md shadow-sm">
        <input type="date" 
            name="birthdate" 
            id="birthdate_baru" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="birthdate_baru"
            @input="handleInput($event)"
            :max="maxDate" />

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_birthdate">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_birthdate_check">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl bg-white"></ion-icon>
        </div>
    </div>

    <div class="birthdate_error" v-if="toogle_birthdate">
        <p class="mt-2 text-sm text-red-600">Tanggal lahir tidak valid.</p>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_birthdate: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            toogle_birthdate: false,
            toogle_birthdate_check: false,
            birthdate_baru: '',
                }
            },
            computed: {
                maxDate() {
                    const today = new Date();
                    today.setFullYear(today.getFullYear() - 10);
                    return today.toISOString().split('T')[0];
                }
        
    },
    mounted() {
        this.birthdate_baru = this.parent_component_birthdate
        this.validate_birthdate()
    },
    watch: {
        parent_component_birthdate(newVal) {
            this.birthdate_baru = newVal
            this.validate_birthdate()
        },
        birthdate_baru: {
            handler(newVal) {
                this.validate_birthdate()
            },
            immediate: true
        }
    },
    emits: ['update:parent_component_birthdate', 'birthdate_status'],
    methods: {
        handleInput(e) {
            this.birthdate_baru = e.target.value
            this.validate_birthdate()
        },
        validate_birthdate() {
            if (!this.birthdate_baru) {
                this.toogle_birthdate = false
                this.toogle_birthdate_check = false
                this.$emit('birthdate_status', null)
                return
            }

            const selectedDate = new Date(this.birthdate_baru)
            const today = new Date()
            const minDate = new Date('1900-01-01')

            const isValid = selectedDate <= today && 
                          selectedDate >= minDate && 
                          !isNaN(selectedDate.getTime())

            this.toogle_birthdate = !isValid
            this.toogle_birthdate_check = isValid
            this.$emit('birthdate_status', isValid)
            this.$emit('update:parent_component_birthdate', this.birthdate_baru)
        }
    }
}
</script>

<style>
.birthdate_error {
    margin-top: 15px;
    animation: flashIn 1s ease-in-out;
}

@keyframes flashIn {
    0% { opacity: 0; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
</style>