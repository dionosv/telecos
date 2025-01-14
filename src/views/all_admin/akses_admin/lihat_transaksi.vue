<template>
    <div>
        <h2>Lihat Transaksi Admin</h2>
        <div v-if="transaksi.length">
            <div v-for="(trans, index) in transaksi" :key="index" class="transaction">
                <p><strong>Transaction ID:</strong> {{ trans.transactionId }}</p>
                <p><strong>Sender ID:</strong> {{ trans.senderId }}</p>
                <p><strong>Receiver ID:</strong> {{ trans.receiverId }}</p>
                <p><strong>Amount:</strong> {{ trans.amount }}</p>
                <p><strong>Timestamp:</strong> {{ trans.timestamp }}</p>
                <p><strong>Transaction Type:</strong> {{ trans.transactionType }}</p>
                <p><strong>Status:</strong> {{ trans.status }}</p>
            </div>
        </div>
        <div v-else>
            <p>No transactions available.</p>
        </div>
    </div>
</template>
<script>
import { get_all_transaction } from '@/components/logic/API/transaction/transaction';

export default {

    data(){
        return {
            transaksi: []
        }
    },
    mounted(){
        this.getTransaksi()
    },
    methods: {
        async getTransaksi(){
            const response = await get_all_transaction();
            if (response.status === 1) {
                this.transaksi = response.transaction;
            } else {
                console.error('Failed to fetch transactions');
            }
        }
    }
    
}
</script>
<style>
.transaction {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}
</style>