<template>
    <div class="relative rounded-md shadow-sm">
        <input type="date" 
            name="first_job" 
            id="first_job_baru" 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="first_job_baru"
            @input="handleInput($event)"
            :max="maxDate" />

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_first_job">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_first_job_check">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl bg-white"></ion-icon>
        </div>
    </div>

    <div class="first_job_error" v-if="toogle_first_job">
        <p class="mt-2 text-sm text-red-600">Tanggal lahir tidak valid.</p>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_first_job: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            toogle_first_job: false,
            toogle_first_job_check: false,
            first_job_baru: '',
                }
            },
            computed: {
                maxDate() {
                    const today = new Date();
                    today.setFullYear(today.getFullYear());
                    return today.toISOString().split('T')[0];
                }
        
    },
    mounted() {
        this.first_job_baru = this.parent_component_first_job
        this.validate_first_job()
    },
    watch: {
        parent_component_first_job(newVal) {
            this.first_job_baru = newVal
            this.validate_first_job()
        },
        first_job_baru: {
            handler(newVal) {
                this.validate_first_job()
            },
            immediate: true
        }
    },
    emits: ['update:parent_component_first_job', 'first_job_status'],
    methods: {
        handleInput(e) {
            this.first_job_baru = e.target.value
            this.validate_first_job()
        },
        validate_first_job() {
            if (!this.first_job_baru) {
                this.toogle_first_job = false
                this.toogle_first_job_check = false
                this.$emit('first_job_status', null)
                return
            }

            const selectedDate = new Date(this.first_job_baru)
            const today = new Date()
            const minDate = new Date('1900-01-01')

            const isValid = selectedDate <= today && 
                          selectedDate >= minDate && 
                          !isNaN(selectedDate.getTime())

            this.toogle_first_job = !isValid
            this.toogle_first_job_check = isValid
            this.$emit('first_job_status', isValid)
            this.$emit('update:parent_component_first_job', this.first_job_baru)
        }
    }
}
</script>

<style>
.first_job_error {
    margin-top: 15px;
    animation: flashIn 1s ease-in-out;
}

@keyframes flashIn {
    0% { opacity: 0; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
</style>