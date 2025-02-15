<template>
    <div class="success-container">
        <div class="success-content">
            <!-- <i class="fas fa-check-circle success-icon"></i> -->
            <ion-icon name="checkmark-circle"></ion-icon>
            <h1 class="success-title">Artikel Berhasil Dibuat!</h1>
            <p class="success-message">
                Artikel telah di upload dan sudah di tampilkan di halaman Telecos.
            </p>

           
        </div>
    </div>
</template>
<script>
export default { 
}
</script>
<style scoped>
.success-container {
    /* min-height: 100vh; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.success-content {
    text-align: center;
    max-width: 600px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

div.success-content ion-icon {
    font-size: 64px;
    color: #28cf2d;
    margin-bottom: 20px;
}

.success-title {
    color: #333;
    margin-bottom: 16px;
    font-size: 24px;
}

.success-message {
    color: #666;
    line-height: 1.6;
    margin-bottom: 24px;
}

.view-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #1976D2;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.view-button:hover {
    background-color: #1565C0;
}
</style>