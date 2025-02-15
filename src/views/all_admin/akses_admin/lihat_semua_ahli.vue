<template>
    <div class="p-6">
        <Spinner v-if="isLoading"></Spinner>
        
        <div v-else class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th class="px-6 py-3">Nama</th>
                        <th class="px-6 py-3">Email</th>
                        <th class="px-6 py-3">Jenis Dokter</th>
                        <th class="px-6 py-3">No. Telepon</th>
                        <th class="px-6 py-3">Gender</th>
                        <th class="px-6 py-3">Tanggal Lahir</th>
                        <th class="px-6 py-3">Mulai Kerja</th>
                        <th class="px-6 py-3">No. STR</th>
                        <th class="px-6 py-3">Almamater</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="expert in experts" 
                        :key="expert.expertId" 
                        class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 font-medium text-gray-900">{{ expert.name }}</td>
                        <td class="px-6 py-4">{{ expert.email }}</td>
                        <td class="px-6 py-4">{{ expert.description }}</td>
                        <td class="px-6 py-4">{{ expert.phoneNum }}</td>
                        <td class="px-6 py-4">{{ expert.gender }}</td>
                        <td class="px-6 py-4">{{ formatDate(expert.dateOfBirth) }}</td>
                        <td class="px-6 py-4">{{ formatDate(expert.firstJob) }}</td>
                        <td class="px-6 py-4">{{ expert.strNum }}</td>
                        <td class="px-6 py-4">{{ expert.almamater }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { get_all_experts } from '@/components/logic/API/experts_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    data() {
        return {
            experts: [],
            isLoading: true
        }
    },

    components: {
        Spinner
    },

    mounted() {
        this.fetch_new();
    },

    methods: {
        async fetch_new(){
            this.isLoading = true;
            try {
                const hasil = await get_all_experts();
                this.experts = hasil.experts;
            } catch (error) {
                console.error('Error fetching experts:', error);
            } finally {
                this.isLoading = false;
            }
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}
</script>

<style>
/* Remove all custom styles since we're using Tailwind */
</style>