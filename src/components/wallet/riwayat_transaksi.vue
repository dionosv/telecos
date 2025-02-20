<template>
  <div class="flow-root">
    <ul role="list" class="mb-8">
      <li v-for="(event, eventIdx) in timeline" :key="event.id">
        <div class="relative pb-8">
          <span v-if="eventIdx !== timeline.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
          <div class="relative flex space-x-3">
            <div>
              <span :class="[event.iconBackground, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                <ion-icon :name="event.icon" class="h-5 w-5 text-white" aria-hidden="true"></ion-icon>
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }} <span class="font-medium text-gray-900">{{ event.target }}</span>
                  <span class="ml-2">Rp {{ event.amount }}</span>
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="event.datetime">{{ event.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { get_transaction_by_user_id } from '../logic/API/transaction/transaction_service';

export default {
  name: 'RiwayatTransaksi',
  props: {
    user_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timeline: []
    }
  },
  watch: {
    user_id: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.get_data_transaksi();
        }
      }
    }
  },
  methods: {
    async get_data_transaksi(){
      try {
        console.log("Fetching transactions for user:", this.user_id);
        const hasil = await get_transaction_by_user_id("user", this.user_id);
        console.log("API Response:", hasil);
        
        if (hasil.status === 1 && hasil.transaction) {
          this.timeline = hasil.transaction
            .map((trans, index) => {
              const date = new Date(trans.timestamp);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return {
                id: index + 1,
                content: trans.transactionType === 'Konsultasi Ahli' ? 'Konsultasi dengan' : 'Top Up',
                target: trans.transactionType === 'Konsultasi Ahli' ? 'Dokter' : 'Telecos',
                date: formattedDate,
                datetime: trans.timestamp,
                amount: trans.amount.toLocaleString('id-ID'),
                icon: trans.transactionType === 'Konsultasi Ahli' ? 'arrow-up-circle' : 'arrow-down-circle',
                iconBackground: trans.transactionType === 'Konsultasi Ahli' ? 'bg-red-500' : 'bg-green-500',
              };
            })
            .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Sort by date, newest first
          console.log("Processed timeline:", this.timeline);
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    }
  }
}
</script>