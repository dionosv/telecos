<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Lihat Semua User</h2>

        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-gray-50">
                    <tr>
                        <th class="py-3 px-6">Nama</th>
                        <th class="py-3 px-6">Email</th>
                        <th class="py-3 px-6">No. Telepon</th>
                        <th class="py-3 px-6">Tanggal Lahir</th>
                        <th class="py-3 px-6">Jenis Kelamin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" 
                        :key="user.userId" 
                        class="bg-white border-b hover:bg-gray-50">
                        <td class="py-4 px-6">{{ user.name }}</td>
                        <td class="py-4 px-6">{{ user.email }}</td>
                        <td class="py-4 px-6">{{ user.phoneNum }}</td>
                        <td class="py-4 px-6">{{ formatDate(user.dateOfBirth) }}</td>
                        <td class="py-4 px-6">{{ user.gender }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { get_all_user } from '@/components/logic/API/user_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    data() {
        return {
            users: [],
            isLoading: true
        }
    },

    components: {
        Spinner
    },

    mounted() {
        this.get_all_user_data();
    },

    methods: {
        async get_all_user_data(){
            try {
                this.isLoading = true;
                const response = await get_all_user();
                if (response.status === 1) {
                    this.users = response.users;
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.isLoading = false;
            }
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID');
        }
    },
}
</script>