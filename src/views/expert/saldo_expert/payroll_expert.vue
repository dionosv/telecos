<template>
    <div class="mx-auto max-w-7xl p-6" id="split">

        <div class="left_section" id="block_bar">

            <div class="wrapper_kiri_atas">
                <div class="header">
                    Saldo
                </div>

                <div class="real_saldo">
                    <h3 id="nama">
                        {{expert_name}}
                    </h3>
                    <!-- <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{user_id}}</span> -->

                    <h3 id="isi_saldo">
                        Rp {{saldo}}
                    </h3>
                </div>
                <!-- <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{{user_id}}</span> -->

            </div>

            <div class="content" id="kiri">
                <div class="wrapper_kiri">
                    <div class="note_topup">
                        <h3>
                            Tarik Saldo ke Rekening Bank
                        </h3>
                        <img src="@/assets/icon/transfer.png" alt="icon transfer" id="icon_transfer">

                    </div>

                    <div class="wd_dana">
                        <form @submit.prevent="submitWithdrawal" class="space-y-4 w-full ">
                            <div class="space-y-2">
                                <label for="bank" class="block text-sm font-medium text-gray-700">Bank</label>
                                <select v-model="withdrawalData.bank" id="bank" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
                                    <option value="">Pilih Bank</option>
                                    <option value="BCA">BCA</option>
                                    <option value="BNI">BNI</option>
                                    <option value="Mandiri">Mandiri</option>
                                    <option value="BRI">BRI</option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <label for="accountNumber" class="block text-sm font-medium text-gray-700">Nomor Rekening</label>
                                <input type="text" id="accountNumber" v-model="withdrawalData.accountNumber" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                    placeholder="Masukkan nomor rekening">
                            </div>

                            <div class="space-y-2">
                                <label for="accountName" class="block text-sm font-medium text-gray-700">Nama Pemilik Rekening</label>
                                <input type="text" id="accountName" v-model="withdrawalData.accountName" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                    placeholder="Masukkan nama pemilik rekening">
                            </div>

                            <div class="space-y-2">
                                <label for="amount" class="block text-sm font-medium text-gray-700">Jumlah Penarikan</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span class="text-gray-500 sm:text-sm">Rp</span>
                                    </div>
                                    <input type="number" id="amount" v-model="withdrawalData.amount" required
                                        class="block w-full rounded-md border-gray-300 pl-10 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                        placeholder="0">
                                </div>
                            </div>

                            <button type="submit"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                                Tarik Dana
                            </button>
                        </form>
                    </div>
 
                </div>
            </div>

        </div>

        <div class="right_section_s" id="block_bar">
            <div class="header">
                Riwayat Transaksi
            </div>

            <div class="content" id="kanan">
                <Riwayat_transaksi_expert :transactions="transactions"></Riwayat_transaksi_expert>
            </div>
        </div>

    </div>
</template>
<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session_service';
import { get_experts_byID } from '@/components/logic/API/experts_service'; 
import { get_transaction_by_user_id, new_transaction_expert_withdrawal } from '@/components/logic/API/transaction/transaction_service';
import { kurangi_saldo_expert } from '@/components/logic/API/saldo/saldo_service';

// import Riwayat_transaksi from '@/components/wallet/riwayat_transaksi.vue';
import Riwayat_transaksi_expert from '@/components/wallet/riwayat_transaksi_expert.vue';

export default {
    components: {
        Riwayat_transaksi_expert
    },
    data() {
        return {
            user_id:"",
            expert_name:"",
            saldo:"",
            pilihan_topup:true,
            transactions: [],
            withdrawalData: {
                bank: '',
                accountNumber: '',
                accountName: '',
                amount: ''
            }
        }
    },
    async mounted(){
        // this.get_user_saldo()
        await this.get_user_details()
        await this.get_data()
    },
    methods:{
        async get_user_details(){
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details();
            if (sessionDetails === false) {
                this.$router.push({ name: 'akun_expert' });
            }
            else{
                this.user_id = sessionDetails.userid;
                const data_user = await get_experts_byID(this.user_id);
                console.log(data_user)
                this.expert_name = data_user.user.name;
                this.saldo = data_user.user.wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },

        async get_data(){
            const response = await get_transaction_by_user_id("Ahli", this.user_id);
            if (response.status === 1) {
                this.transactions = response.transaction;
            }
        },
        
        async submitWithdrawal() {
            try {
                if (this.withdrawalData.amount <= 0) {
                    alert('Jumlah penarikan harus lebih dari 0');
                    return;
                }

                if (parseInt(this.withdrawalData.amount) > parseInt(this.saldo.replace(/\./g, ''))) {
                    alert('Saldo tidak mencukupi');
                    return;
                }

                // Create transaction record first
                const transactionResponse = await new_transaction_expert_withdrawal(
                    Date.now().toString(), // Using timestamp as session ID
                    this.user_id,
                    this.withdrawalData.amount
                );

                if (transactionResponse.status !== 1) {
                    alert('Gagal membuat transaksi: ' + transactionResponse.message);
                    return;
                }

                // If transaction is created successfully, proceed with reducing balance
                const withdrawalResponse = await kurangi_saldo_expert(this.user_id, this.withdrawalData.amount);
                
                if (withdrawalResponse.status === 1) {
                    alert('Penarikan berhasil');
                    await this.get_user_details();
                    await this.get_data();
                    this.withdrawalData = {
                        bank: '',
                        accountNumber: '',
                        accountName: '',
                        amount: ''
                    };
                } else {
                    alert('Penarikan gagal: ' + withdrawalResponse.message);
                }
            } catch (error) {
                console.error('Error during withdrawal:', error);
                alert('Terjadi kesalahan saat melakukan penarikan');
            }
        }
         
    }

}
</script>
<style scoped>
#split {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

#block_bar {
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: white;
    padding: 1.5rem;
    width: 600px;
    height: 550px;
}

div#block_bar div.header {
    font-size: 25px;
    font-weight: bold;
}

.left_section {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}

.content {
    /* padding: 5px; */
    margin-top: 20px;
}

.content#kanan {
    overflow-y: auto;
    height: 380px;
}
.content#kiri {
    /* overflow-y: auto; */
    height: 335px;
}

#icon_transfer {
    width: 1.5rem;
    height: 1.5rem;
}

.bagian_topup {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin-top: 0.3rem;
}
.real_saldo{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#trf {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;

    /* width: 300px; */
    width: 50rem;
    height: 3.5rem;
    padding: 2px;
    /* background-color:lightblue; */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

div.bagian_topup div#trf h3 {
    font-weight: bold;
    font-size: 18px;
}

.note_topup {
    display: flex;
    align-items: center;
    align-items: center;
    gap: 10px;
    /* justify-content: center; */
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
}

div#block_bar.left_section{
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    /* justify-content: spa; */
}

.show_transfer, .show_virtual_account {
    margin-top: 20px;
    /* padding: 15px; */
    /* background-color: #f8f9fa; */
    border-radius: 10px;
}

.bank-info, .va-info {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: white;
}

.bank-info h4, .va-info h4 {
    font-weight: bold;
    margin-bottom: 5px;
    color: #2d3748;
}

.account-number, .va-number {
    font-family: monospace;
    font-size: 1.1em;
    color: #4a5568;
    margin-bottom: 3px;
}

.account-name {
    color: #718096;
    font-size: 0.9em;
}

@media (max-width: 1024px) {
    #split {
        flex-direction: column;
    }

    #block_bar {
        width: 100%;
        max-width: 600px;
        height: 600px;
    }

    .bagian_topup {
        flex-direction: column;
        gap: 1rem;
    }

    #trf {
        width: 100%;
        height: 4rem;
        padding: 0.5rem;
    }

    .real_saldo {
        text-align: center;
        margin-bottom: 1rem;
    }

    .note_topup {
        text-align: center;
        margin-bottom: 1rem;
    }
    .content#kanan{
        height: 500px;
    }

    div#block_bar.left_section{
        justify-content: flex-start;
    }
}

@media (max-width: 480px) {
    #block_bar {
        padding: 1rem;
    }

    div#block_bar div.header {
        font-size: 20px;
    }

    div.bagian_topup div#trf h3 {
        font-size: 16px;
    }

    #icon_transfer {
        width: 30px;
        height: 30px;
    }
}
</style>