<template>
    <div class="relative rounded-md shadow-sm">
        <select
            id="jenis_ahli"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="parent_component_jenis_ahli"
            @change="handleChange($event)">
            <option value="">Pilih Jenis Ahli</option>
            <option value="Dokter Kecantikan">Dokter Kecantikan</option>
            <option value="Dokter Kulit">Dokter Kulit</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_jenis_ahli: {
            type: String,
            required: true
        }
    },
    emits: ['update:parent_component_jenis_ahli', 'jenis_ahli_status'],
    methods: {
        handleChange(e) {
            const value = e.target.value
            this.$emit('update:parent_component_jenis_ahli', value)
            this.$emit('jenis_ahli_status', value !== '')
        }
    },
    mounted() {
        this.$emit('jenis_ahli_status', this.parent_component_jenis_ahli !== '')
    }
}
</script>
