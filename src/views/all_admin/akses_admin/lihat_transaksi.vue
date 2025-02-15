<template>
    <div>
        <h2>Transaksi</h2>
        <Spinner v-if="loading"></Spinner>
        <div v-if="!loading && transaksi.length">
            <div v-for="(trans, index) in sortedTransactions" :key="index" class="transaction">
                <p><strong>Transaction ID:</strong> {{ trans.transactionId }}</p>
                <p><strong>Sender:</strong> {{ getSenderName(trans) }} ({{ trans.senderType }})</p>
                <p><strong>Receiver:</strong> {{ getReceiverName(trans) }} ({{ trans.receiverType }})</p>
                <p><strong>Amount:</strong> {{ formatAmount(trans.amount) }}</p>
                <p><strong>Timestamp:</strong> {{ formatTimestamp(trans.timestamp) }}</p>
                <p><strong>Transaction Type:</strong> {{ trans.transactionType }}</p>
                <p><strong>Status:</strong> {{ formatStatus(trans.status) }}</p>
            </div>
        </div>
        <div v-else-if="!loading">
            <p>No transactions available.</p>
        </div>
    </div>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts_service';
import { get_all_transaction } from '@/components/logic/API/transaction/transaction_service';
import { get_user_data } from '@/components/logic/API/user_service';
import Spinner from '@/components/spinner/spinner.vue';

export default {

    data(){
        return {
            transaksi: [],
            loading: false,
            userNames: new Map(),
            expertNames: new Map()
        }
    },

    components: {
        Spinner
    },
    mounted(){
        this.getTransaksi()
    },
    computed: {
        sortedTransactions() {
            return [...this.transaksi].sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
        }
    },
    methods: {
        async getTransaksi(){
            this.loading = true;
            try {
                const response = await get_all_transaction();
                if (response.status === 1) {
                    this.transaksi = response.transaction;
                    
                    // Process each transaction to get names
                    for (const trans of this.transaksi) {
                        if (trans.senderType === 'User') {
                            await this.fetchUserName(trans.senderId);
                        } else if (trans.senderType === 'Ahli') {
                            await this.fetchExpertName(trans.senderId);
                        }
                        
                        // Do the same for receiver if needed
                        if (trans.receiverType === 'User') {
                            await this.fetchUserName(trans.receiverId);
                        } else if (trans.receiverType === 'Ahli') {
                            await this.fetchExpertName(trans.receiverId);
                        }
                    }
                } else {
                    console.error('Failed to fetch transactions');
                }
            } finally {
                this.loading = false;
            }
        },

        async fetchUserName(userId) {
            if (!this.userNames.has(userId)) {
                try {
                    const response = await get_user_data(userId);
                    if (response.status === 1) {
                        this.userNames.set(userId, response.user.name);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        },

        async fetchExpertName(expertId) {
            if (!this.expertNames.has(expertId)) {
                try {
                    const response = await get_experts_byID(expertId);
                    if (response.status === 1) {
                        this.expertNames.set(expertId, response.user.name); // Changed from response.expert.name to response.user.name
                    }
                } catch (error) {
                    console.error('Error fetching expert data:', error);
                }
            }
        },

        getSenderName(trans) {
            if (trans.senderType === 'Telecos') return 'Telecos';
            if (trans.senderType === 'User') return this.userNames.get(trans.senderId) || trans.senderId;
            if (trans.senderType === 'Ahli') return this.expertNames.get(trans.senderId) || trans.senderId;
            return trans.senderId;
        },

        getReceiverName(trans) {
            if (trans.receiverType === 'Telecos') return 'Telecos';
            if (trans.receiverType === 'User') return this.userNames.get(trans.receiverId) || trans.receiverId;
            if (trans.receiverType === 'Ahli') return this.expertNames.get(trans.receiverId) || trans.receiverId;
            return trans.receiverId;
        },

        formatStatus(status) {
            return status === 1 ? 'Sukses' : status;
        },

        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }) + ' WIB';
        },

        formatAmount(amount) {
            return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    }
    
}
</script>
<style>
.transaction {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px 20px;
    margin-bottom: 15px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.transaction:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.transaction p {
    margin: 8px 0;
    font-size: 14px;
    color: #4a4a4a;
}

.transaction strong {
    color: #2c3e50;
    font-weight: 600;
    margin-right: 8px;
}

h2 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 600;
}
</style>