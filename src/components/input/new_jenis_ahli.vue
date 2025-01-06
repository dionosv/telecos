<template>
    <div class="relative rounded-md shadow-sm">
        <select
            id="gender_baru"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="gender_baru"
            @change="handleChange($event)">
            <option value="Dokter Kecantikan">Dokter Kecantikan</option>
            <option value="Dokter Kulit">Dokter Kulit</option>
            <option value="Tenaga Ahli Kecantikan">Tenaga Ahli Kecantikan</option>

        </select>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_gender: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            gender_baru: ''
        }
    },
    mounted() {
        this.gender_baru = this.parent_component_gender
        this.validate_gender()
    },
    watch: {
        parent_component_gender(newVal) {
            this.gender_baru = newVal
            this.validate_gender()
        }
    },
    emits: ['update:parent_component_gender', 'gender_status'],
    methods: {
        handleChange(e) {
            this.gender_baru = e.target.value
            this.validate_gender()
        },
        validate_gender() {
            const isValid = ['Laki Laki', 'Perempuan'].includes(this.gender_baru)
            this.$emit('gender_status', isValid)
            this.$emit('update:parent_component_gender', this.gender_baru)
        }
    }
}
</script>
