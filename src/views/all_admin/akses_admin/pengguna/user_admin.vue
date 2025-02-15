<template>
    <div class="container mx-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Lihat Semua User Button -->
            <div @click="$router.push({ name: 'lihat_semua_user_admin' })" 
                 class="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                <div class="flex items-center">
                    <ion-icon name="people-outline" class="text-3xl text-blue-600"></ion-icon>
                    <h2 class="ml-4 text-xl font-semibold">Lihat Semua User</h2>
                </div>
            </div>

            <!-- Top Up User Button -->
            <div @click="$router.push({ name: 'top_up_user_admin' })" 
                 class="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                <div class="flex items-center">
                    <ion-icon name="wallet-outline" class="text-3xl text-green-600"></ion-icon>
                    <h2 class="ml-4 text-xl font-semibold">Top Up User</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserAdmin',
}
</script>

<style scoped>
.container {
    min-height: 100vh;
}
</style>