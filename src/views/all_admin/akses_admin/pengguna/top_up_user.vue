<template>
    <div class="p-6">
        <div class="max-w-2xl mx-auto bg-white rounded-lg  p-6">
            <h2 class="text-2xl font-bold mb-6">Top Up User</h2>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Pilih User</label>
                <div class="relative">
                    <input
                        v-model="searchQuery"
                        type="text"
                        class="w-full border rounded-lg p-2"
                        placeholder="Masukkan nama user"
                        @focus="showDropdown = true"
                    >
                    <!-- Dropdown -->
                    <div v-if="showDropdown" 
                         class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div
                            v-for="user in filteredUsers"
                            :key="user.userId"
                            @click="selectUser(user)"
                            class="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {{ user.name }} (ID: {{ user.userId }})
                        </div>
                    </div>
                </div>
                <!-- <p v-if="selectedUser" class="mt-2 text-sm text-gray-600">
                    Selected User: {{ selectedUser.name }} (ID: {{ selectedUser.userId }})
                </p> -->
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Metode Top Up</label>
                <select 
                    v-model="paymentMethod"
                    class="w-full border rounded-lg p-2"
                >
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="va">Virtual Account</option> 
                </select>
            </div>

            <!-- New Bank Selection Field -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Pilih Bank</label>
                <select 
                    v-model="bankType"
                    class="w-full border rounded-lg p-2"
                >
                    <option value="">Pilih Bank</option>
                    <option value="bca">BCA</option>
                    <option value="mandiri">Mandiri</option>
                </select>
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">Jumlah</label>
                <input
                    v-model="displayAmount"
                    type="text"
                    class="w-full border rounded-lg p-2"
                    placeholder="Masukkan jumlah"
                    @input="formatAmount"
                    @blur="handleBlur"
                >
            </div>

            <button 
                @click="handleTopUp"
                class="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                :disabled="!isFormValid"
            >
                Top Up
            </button>
        </div>
    </div>
</template>

<script>
import { tambah_saldo_user } from '@/components/logic/API/saldo/saldo_service';
import { new_transaction_top_up } from '@/components/logic/API/transaction/transaction_service';
import { get_all_user } from '@/components/logic/API/user_service';

export default {
    data() {
        return {
            users: [],
            searchQuery: '',
            selectedUser: null,
            showDropdown: false,
            paymentMethod: 'bank_transfer',
            amount: '',
            bankType: '',
            displayAmount: '',
        }
    },

    computed: {
        filteredUsers() {
            return this.users.filter(user => 
                user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        isFormValid() {
            if (this.paymentMethod === 'bank_transfer') {
                return this.selectedUser && this.bankType && this.amount > 0;
            }
            return this.selectedUser && this.paymentMethod && this.amount > 0;
        }
    },

    mounted() {
        // Close dropdown when clicking outside
        document.addEventListener('click', this.handleClickOutside);
        this.get_all_u_data();
    },

    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    methods: {
        async get_all_u_data() {
            const response = await get_all_user();
            // console.log(response);
            this.users = response.users || [];
        },

        selectUser(user) {
            this.selectedUser = user;
            this.searchQuery = user.name;
            this.showDropdown = false;
        },

        handleClickOutside(event) {
            const dropdown = this.$el.querySelector('.relative');
            if (dropdown && !dropdown.contains(event.target)) {
                this.showDropdown = false;
            }
        },

        formatAmount(event) {
            // Remove non-numeric characters
            let value = event.target.value.replace(/\D/g, '');
            
            // Convert to number and format with thousand separator
            if (value) {
                const number = parseInt(value);
                this.displayAmount = number.toLocaleString('id-ID');
                this.amount = number.toString();
            } else {
                this.displayAmount = '';
                this.amount = '';
            }
        },

        handleBlur() {
            if (this.displayAmount) {
                // Ensure consistent formatting on blur
                const number = parseInt(this.displayAmount.replace(/\D/g, ''));
                this.displayAmount = number.toLocaleString('id-ID');
            }
        },

        async handleTopUp() {
            if (!this.isFormValid) return;

            try {
                let senderId;
                if (this.paymentMethod === 'bank_transfer') {
                    senderId = `Transfer Bank (${this.bankType.toUpperCase()})`;
                } else if (this.paymentMethod === 'va') {
                    senderId = `Transfer Virtual Account (${this.bankType.toUpperCase()})`;
                }

                await this.cycle_topup(
                    'SESSION_ID',
                    'user',
                    this.selectedUser.id,
                    senderId,
                    parseFloat(this.amount)
                );

                // Reset form
                this.searchQuery = '';
                this.selectedUser = null;
                this.amount = '';
                this.displayAmount = '';
                this.bankType = '';
                
                alert('Top up berhasil!');
            } catch (error) {
                alert('Terjadi kesalahan saat proses top up: ' + error.message);
            }
        },

        async cycle_topup(sessionId, receiverType, receiverId, senderId, amount) {
            await new_transaction_top_up(sessionId,
                receiverType,
                receiverId,
                senderId, //topup bank / topup bca va atau apapun itu 
                amount);

            await tambah_saldo_user(receiverId, amount);
        }
    }
}
</script>
<style>
.max-h-60 {
    max-height: 15rem;
}
</style>