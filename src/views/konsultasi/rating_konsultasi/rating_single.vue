<template>
    <Spinner v-if="isLoading"></Spinner>

    <div class="end_side" v-else>
        <div class="header_1">
            <Logo_aja></Logo_aja>
        </div>

        <div class="rating-container">
            <h2>{{ canRate ? 'Bagaimana Konsultasi Anda?' : 'Anda Sudah Memberikan Rating' }}</h2>
            <p class="session-name">{{ meeting.sessionName }}</p>
            <div class="stars" :class="{ 'pointer-events-none opacity-50': !canRate }">
                <span v-for="star in 5" :key="star" class="star" :class="{ 'active': star <= rating }"
                    @click="setRating(star)">★</span>
            </div>
            <p class="rating-text">{{ rating }} dari 5</p>
            
            <!-- Add notes textarea -->
            <div class="mt-4 mb-6">
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                    Tambahkan Catatan (Opsional)
                </label>
                <textarea
                    id="notes"
                    v-model="notes"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 
                           focus:border-green-500 resize-none text-sm"
                    placeholder="Bagaimana pengalaman konsultasi Anda?"
                    :disabled="!canRate"
                    :class="{ 'bg-gray-100': !canRate }"
                ></textarea>
            </div>

            <button 
                class="bg-green-500 text-white px-8 py-3 rounded-full text-base font-medium
                       hover:bg-green-600 transition-colors duration-200 ease-in-out
                       disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                @click="submitRating" 
                :disabled="rating === 0 || !canRate"
                v-if="canRate">
                Kirim Rating
            </button>
            <p v-else class="text-gray-500 mt-4">Rating telah dikirim sebelumnya</p>
        </div>

        <div class="summary-container">
            <h3>Detail Konsultasi</h3>
            <div class="summary-item">
                <span class="label">Tanggal</span>
                <span class="value">{{ formatDate(meeting.date) }}</span>
            </div>
            <div class="summary-item">
                <span class="label">Waktu</span>
                <span class="value">{{ formatTime(meeting.date) }} - {{ formatTime(meeting.endDate) }}</span>
            </div>
            <div class="summary-item">
                <span class="label">Biaya</span>
                <span class="value price">Rp {{ formatPrice(meeting.rate) }}</span>
            </div>
        </div>
    </div>

</template>

<script>
import { get_rating_by_session_id, new_rating } from '@/components/logic/API/rating/rating_service';
import { get_session_by_session_Id } from '@/components/logic/API/session/session_service';
import Logo_aja from '@/components/logo/logo_aja.vue';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    name: 'RatingKonsultasi',
    components: {
        Logo_aja, Spinner
    },
    
    data() {
        return {
            rating: 0,
            current_date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            current_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
            data_ahli: {
                description: ''
            },
            meeting: {
                sessionId: '',
                sessionName: '',
                date: '',
                endDate: '',
                expertId: '',
                rate: 0,
                status: '',
                userId: ''
            },
            session_id: this.$route.params.session_id,
            notes: '',  // Add this line
            canRate: true,
            existingRating: null,
            isLoading: true
        }
    },

    mounted() {
        this.get_trx_by_trx_id();
        this.check_rating();
    },
    methods: {
        setRating(value) {
            if (this.canRate) {
                this.rating = value;
            }
        },
        async get_trx_by_trx_id(){
            const hasil = await get_session_by_session_Id(this.session_id);
            const sessionData = hasil.session[0];
            this.meeting = {
                sessionId: sessionData.sessionId,
                sessionName: sessionData.sessionName,
                date: sessionData.date,
                endDate: sessionData.endDate,
                expertId: sessionData.expertId,
                rate: sessionData.rate,
                status: sessionData.status,
                userId: sessionData.userId
            };
        },
        formatDateTime(dateString) {
            return new Date(dateString).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        formatTime(dateString) {
            return new Date(dateString).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        async check_rating(){
            this.isLoading = true;
            try {
                const hasil = await get_rating_by_session_id(this.session_id);
                if (hasil.status === 1 && hasil.rating?.[0]) {
                    this.canRate = false;
                    this.existingRating = hasil.rating[0];
                    this.rating = hasil.rating[0].ratingScore;
                    this.notes = hasil.rating[0].ratingContent;
                } else {
                    this.canRate = true;
                }
            } catch (error) {
                console.error('Error checking rating:', error);
                this.canRate = true;
            } finally {
                this.isLoading = false;
            }
        },

        async submitRating() {
            try {
                const hasil = await new_rating(
                    this.meeting.userId,
                    this.meeting.expertId,
                    this.meeting.sessionId,
                    this.rating,
                    this.notes
                ); 

                console.log(hasil);

                // alert('Rating berhasil dikirim!');
                // Redirect to another page or show success message
            } catch (error) {
                console.error('Error submitting rating:', error);
                alert('Gagal mengirim rating. Silakan coba lagi.');
            }
        }
    },

}
</script>

<style scoped>
.end_side {
    background-color: white;
    width: 400px;
    padding: 30px 25px;
    font-family: 'Inter', sans-serif;
    position: relative;
    min-height: 400px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}

.header_1 {
    text-align: center;
    margin-bottom: 30px;
}

.rating-container {
    text-align: center;
    padding: 20px 0 30px;
    border-bottom: 1px solid #eee;
}

.rating-container h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
}

.session-name {
    color: #666;
    margin-bottom: 20px;
    font-size: 1.1rem;
}

.stars {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.star {
    font-size: 35px;
    cursor: pointer;
    color: #ddd;
    transition: color 0.2s ease;
}

.star.active {
    color: #FFD700;
}

.rating-text {
    color: #666;
    margin-bottom: 20px;
}

.summary-container {
    padding: 30px 0 0;
}

.summary-container h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.2rem;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.label {
    color: #666;
    font-size: 0.9rem;
}

.value {
    color: #333;
    font-weight: 500;
}

.price {
    color: #4CAF50;
    font-weight: 600;
}

@media (max-width: 768px) {
    .end_side {
        width: 90%;
        max-width: 400px;
        margin: 20px auto;
        padding: 20px 15px;
    }
}
</style>