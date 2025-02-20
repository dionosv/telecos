<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="text-center">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Top Up Saldo User</DialogTitle>
                  <div class="mt-4">
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700">Search User</label>
                      <div class="relative">
                        <input 
                          type="text" 
                          v-model="searchQuery" 
                          @input="filterUsers"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                          placeholder="Search by name..."
                        />
                        <!-- Dropdown results -->
                        <div v-if="showDropdown && filteredUsers.length > 0" 
                             class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
                          <div 
                            v-for="user in filteredUsers" 
                            :key="user.userId"
                            @click="selectUser(user)"
                            class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <div class="text-sm">{{ user.name }}</div>
                            <div class="text-xs text-gray-500">ID: {{ user.userId }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700">Selected User ID</label>
                      <input 
                        type="text" 
                        v-model="userId" 
                        readonly
                        class="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                      />
                    </div>
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700">Amount</label>
                      <input 
                        type="number" 
                        v-model="amount" 
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                        placeholder="0"
                      />
                    </div>
                    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
                    <p v-if="successMessage" class="mt-2 text-sm text-green-600">{{ successMessage }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2" @click="handleTopUp">Top Up</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="closeModal" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { tambah_saldo_user } from '@/components/logic/API/saldo/saldo_service';
import { new_transaction_top_up } from '@/components/logic/API/transaction/transaction_service';
import { get_all_user } from '@/components/logic/API/user_service';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  },
  data() {
    return {
      isOpen: true,
      userId: '',
      amount: 0,
      error: '',
      users: [],
      filteredUsers: [],
      searchQuery: '',
      showDropdown: false,
      selectedUserName: '',
      successMessage: ''
    }
  },
  async created() {
    try {
      await this.get_usr()
    } catch (err) {
      this.error = 'Failed to load users';
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false
      this.$emit('close')
    },

    async get_usr() {
      try {
        const response = await get_all_user();
        if (response.status === 1) {
          this.users = response.users || [];
          this.filteredUsers = this.users;
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
        this.error = 'Failed to load users';
      }
    },

    filterUsers() {
      if (!this.searchQuery.trim()) {
        this.filteredUsers = [];
        this.showDropdown = false;
        return;
      }
      
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showDropdown = true;
    },

    selectUser(user) {
      this.userId = user.userId;
      this.searchQuery = `${user.name} (${user.email})`;
      this.showDropdown = false;
    },

    async handleTopUp() {
      try {
        if (!this.userId || !this.amount) {
          this.error = 'Please fill in all fields'
          this.successMessage = ''
          return
        }
        const hasil = await tambah_saldo_user(this.userId, Number(this.amount))

        if(hasil.status === 1){
          await new_transaction_top_up(
              "0",
              "User",
              this.userId,
              "Top Up",
              Number(this.amount)
          )
          this.successMessage = `Top up berhasil sebesar Rp ${Number(this.amount).toLocaleString('id-ID')}!`
          this.error = ''
          
          // Close modal after 2 seconds
          setTimeout(() => {
            this.$emit('success')
            this.closeModal()
          }, 2000)
        } else {
          this.error = 'Top up gagal!'
          this.successMessage = ''
        }
      } catch (err) {
        this.error = 'Top Up Gagal, Coba Lagi'
        this.successMessage = ''
      }
    }
  }
}
</script>