<template>
    <div class="end_side">
        <div class="header_1">
            <Logo_aja></Logo_aja>
            <div class="tanggal">
                <p>{{ current_date }}</p>
                <p>{{ current_time }}</p>
            </div>
        </div>

        <div class="detail">
            <div class="split_1">
                <p>Konsultasi {{ data_ahli.description }}</p>
                <p>Rp {{ meeting.price }}</p>
            </div>

            <div class="split_1">
                <p>Metode Pembayaran</p>
                <p>Wallet</p>
            </div>
        </div>

        <div class="rating-container">
            <h2>Beri Rating Konsultasi</h2>
            <div class="stars">
                <span v-for="star in 5" :key="star" class="star" :class="{ 'active': star <= rating }"
                    @click="setRating(star)">★</span>
            </div>
            <p>{{ rating }} dari 5</p>
        </div>
    </div>
</template>

<script>
import Logo_aja from '@/components/logo/logo_aja.vue';

export default {
    name: 'RatingKonsultasi',
    components: {
        Logo_aja
    },
    data() {
        return {
            rating: 0,
            current_date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            current_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
            // Add these properties and populate them with your data
            data_ahli: {
                description: ''
            },
            meeting: {
                price: ''
            }
        }
    },
    methods: {
        setRating(value) {
            this.rating = value;
        }
    }
}
</script>

<style scoped>
.end_side {
    background-color: white;
    width: 400px;
    padding: 20px 15px;
    font-family: 'Courier New', monospace;
    position: relative;
    min-height: 400px;
    border: 1px solid #ddd;
    margin: 0 auto;
}

.end_side::before,
.end_side::after {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    height: 5px;
    background: repeating-linear-gradient(90deg,
            #fff 0px,
            #fff 4px,
            transparent 4px,
            transparent 8px);
}

.end_side::before {
    top: -5px;
}

.end_side::after {
    bottom: -5px;
}

.header_1 {
    text-align: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px dashed #000;
}

.tanggal {
    margin-top: 15px;
    font-size: 0.8rem;
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.detail {
    padding: 10px 0;
    border-bottom: 1px dashed #000;
}

.split_1 {
    padding: 8px 0;
    font-size: 0.85rem;
    color: #000;
    display: flex;
    justify-content: space-between;
    line-height: 1.4;
}

.split_1 p:last-child {
    font-weight: bold;
}

/* Existing rating styles */
.rating-container {
    text-align: center;
    padding: 20px;
}

.stars {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.star {
    font-size: 30px;
    cursor: pointer;
    color: #ddd;
}

.star.active {
    color: #ffd700;
}

.star:hover {
    color: #ffd700;
}

@media (max-width: 768px) {
    .end_side {
        width: 100%;
        max-width: 100%;
        margin: 10px auto;
    }
}
</style>