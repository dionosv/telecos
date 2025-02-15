<template>
    <div class="container mx-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Lihat Artikel Button -->
            <div @click="$router.push({ name: 'lihat_artikel_saya_admin' })" 
                 class="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                <div class="flex items-center">
                    <ion-icon name="list-outline" class="text-3xl text-blue-600"></ion-icon>
                    <div class="ml-4">
                        <h2 class="text-xl font-semibold">Lihat Artikel</h2>
                        <!-- <p class="text-gray-600">Lihat dan kelola artikel</p> -->
                    </div>
                </div>
            </div>

            <!-- Buat Artikel Button -->
            <div @click="$router.push({ name: 'buat_artikel_admin' })" 
                 class="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                <div class="flex items-center">
                    <ion-icon name="create-outline" class="text-3xl text-green-600"></ion-icon>
                    <div class="ml-4">
                        <h2 class="text-xl font-semibold">Buat Artikel Baru</h2>
                        <!-- <p class="text-gray-600">Tambah artikel baru</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArtikelAhli'
}
</script>

<style scoped>
.container {
    min-height: 100vh;
}
</style>