<template>
    <div class="container">
        <div class="all_artikel">
            <div class="lihat_artikel">
                <router-link :to="{name : 'lihat_artikel_saya_admin'}" class="artikel-link">
                    <div class="artikel-card">
                        <ion-icon name="list-outline" class="card-icon"></ion-icon>
                        <h2>Lihat Artikel</h2>
                        <p>Lihat dan kelola artikel</p>
                    </div>
                </router-link>
            </div>

            <div class="buat_artikel">
                <router-link :to="{name:'buat_artikel_admin'}" class="artikel-link">
                    <div class="artikel-card">
                        <ion-icon name="create-outline" class="card-icon"></ion-icon>
                        <h2>Buat Artikel Baru</h2>
                        <p>Tambah artikel baru</p>
                    </div>
                </router-link>
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 1rem;
}

.all_artikel {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.artikel-link {
    text-decoration: none;
    color: inherit;
}

.artikel-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.2s;
    width: 300px;
    height: 300px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.artikel-card:hover {
    transform: translateY(-5px);
}

.artikel-card h2 {
    margin-bottom: 1rem;
    color: #2c3e50;
}

.artikel-card p {
    color: #666;
}

.card-icon {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .all_artikel {
        flex-direction: column;
        align-items: center;
    }

    .artikel-card {
        width: 100%;
        max-width: 300px;
    }
}
</style>