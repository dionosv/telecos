<template>
  <div class="flow-root">
    <ul role="list" class="mb-8">
      <li v-for="(transaction, index) in formattedTransactions" :key="transaction.transactionId">
        <div class="relative pb-8">
          <span v-if="index !== formattedTransactions.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
          <div class="relative flex space-x-3">
            <div>
              <span :class="[transaction.iconBackground, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                <ion-icon :name="transaction.icon" class="h-5 w-5 text-white" aria-hidden="true"></ion-icon>
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">
                  {{ transaction.content }} 
                  <span class="font-medium text-gray-900">Rp {{ formatNumber(transaction.amount) }}</span>
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="transaction.datetime">{{ transaction.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RiwayatTransaksiExpert',
  props: {
    transactions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    formattedTransactions() {
      return this.transactions.map(transaction => ({
        transactionId: transaction.transactionId,
        content: transaction.transactionType,
        amount: transaction.amount,
        datetime: transaction.timestamp,
        date: new Date(transaction.timestamp).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        icon: this.getTransactionIcon(transaction.transactionType),
        iconBackground: this.getTransactionColor(transaction.transactionType)
      }));
    }
  },
  methods: {
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getTransactionIcon(type) {
      return type.toLowerCase().includes('selesai') ? 'arrow-down-circle' : 'arrow-up-circle';
    },
    getTransactionColor(type) {
      return type.toLowerCase().includes('selesai') ? 'bg-green-500' : 'bg-red-500';
    }
  }
})
</script>