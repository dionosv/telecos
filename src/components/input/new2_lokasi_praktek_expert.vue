<template>
    <div class="flex flex-col md:flex-row rounded-md gap-3 md:gap-2">
        <select id="provinsi"
            class="block w-full md:w-1/2 shadow-sm rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="provinsi" @change="handleChange($event)"> 
            <option v-for="provinsi in provinsiData" :key="provinsi.code" :value="provinsi.code">
                {{ provinsi.name }}
            </option> 
        </select>

        <select id="kota"
            class="block w-full md:w-1/2 shadow-sm rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="hasil_selected" @change="handleKotaChange($event)">
            <option v-for="kota in kotaData" :key="kota.code" :value="kota.code">
                {{ kota.name }}
            </option>
        </select>
    </div>
</template>

<script>


export default {
    props: {
        parent_component_lokasi: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            hasil_selected: '',
            provinsi: '',
            provinsiData: [],
            kotaData: []
        }
    },
    mounted() {
        // Split incoming data on mount
        if (this.parent_component_lokasi) {
            this.provinsi = this.parent_component_lokasi.split('.')[0]
            this.hasil_selected = this.parent_component_lokasi
        }
        this.get_data_provinsi()
    },
    watch: {
        parent_component_lokasi(newVal) {
            if (newVal) {
                this.provinsi = newVal.split('.')[0]
                this.hasil_selected = newVal
                this.get_data_kota(this.provinsi)
            }
        },
        hasil_selected(newVal) {
            if (newVal) {
                this.$emit('update:parent_component_lokasi', newVal)
                this.$emit('lokasi_status', true)
            }
        }
    },
    emits: ['update:parent_component_lokasi', 'lokasi_status'],
    methods: {
        async handleChange(e) {
            this.provinsi = e.target.value
            this.hasil_selected = ''  // Reset hasil_selected when province changes
            await this.do_next_step()
        },
        async handleKotaChange(e) {
            const selectedValue = e.target.value
            this.provinsi = selectedValue.split('.')[0]  // Update provinsi from selected kota
            this.hasil_selected = selectedValue
            this.$emit('update:parent_component_lokasi', this.hasil_selected)
            this.$emit('lokasi_status', true)
        },
        
        async do_next_step() {
            this.get_data_kota(this.provinsi);
        },
        async get_data_provinsi() {
            try {
                const response = await fetch('../src/components/data_lokasi/provinsi.json'); // Pastikan path benar
                const data = await response.json();
                this.provinsiData = data.data; // Assign fetched data to provinsiData
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async get_data_kota(provinsi_code) {
            try {
                const response = await fetch(`../src/components/data_lokasi/lokasi/${provinsi_code}.json`); // Pastikan path benar
                const data = await response.json();
                this.kotaData = data.data; // Assign fetched data to kotaData
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
    }
}
</script>
