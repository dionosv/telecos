<template>
    <div class="mx-auto max-w-7xl p-6" id="split">

        <div class="left_section" id="block_bar">

            <div class="wrapper_kiri_atas">
                <div class="header">
                    Saldo
                </div>

                <div class="real_saldo">
                    <h3 id="nama">
                        {{user_name}}
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
                            Top Up Saldo
                        </h3>
                        <img src="@/assets/icon/transfer.png" alt="icon transfer" id="icon_transfer">

                    </div>

                    <div class="bagian_topup">

                        <div class="via_transfer" id="trf" @click="handle_toogle_trf()">
                            <!-- <img src="@/assets/icon/transfer.png" alt="icon transfer" id="icon_transfer"> -->
                            <h3>
                                Transfer Manual
                            </h3>
                        </div>
                        <div class="via_va" id="trf" @click="handle_toogle_trf()">
                            <!-- <img src="@/assets/icon/transfer.png" alt="icon transfer" id="icon_transfer"> -->
                            <h3>
                                Virtual Account
                            </h3>
                        </div>

                    </div>

                    <div class="show_methods">
                        <div class="show_transfer" v-if="pilihan_topup">
                            <div class="bank-info">
                                <h4>Transfer Bank BCA</h4>
                                <p class="account-number">1234 5678 9012 3456</p>
                                <p class="account-name">PT. TELECOS INDONESIA</p>
                            </div>
                            <div class="bank-info">
                                <h4>Transfer Bank Mandiri</h4>
                                <p class="account-number">9876 5432 1098 7654</p>
                                <p class="account-name">PT. TELECOS INDONESIA</p>
                            </div>
                        </div>

                        <div class="show_virtual_account" v-else>
                            <div class="va-info">
                                <h4>BCA Virtual Account</h4>
                                <p class="va-number">8277 0810 1234 5678</p>
                            </div>
                            <div class="va-info">
                                <h4>Mandiri Virtual Account</h4>
                                <p class="va-number">8900 0810 9876 5432</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="right_section_s" id="block_bar">
            <div class="header">
                Riwayat Transaksi
            </div>

            <div class="content" id="kanan">
                <Riwayat_transaksi></Riwayat_transaksi>
            </div>
        </div>

    </div>
</template>
<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session';
import { get_user_data } from '@/components/logic/API/user';
import Riwayat_transaksi from '@/components/wallet/riwayat_transaksi.vue';

export default {
    components: {
        Riwayat_transaksi
    },
    data() {
        return {
            user_id:"",
            user_name:"",
            saldo:"",
            pilihan_topup:true
        }
    },
    mounted(){
        // this.get_user_saldo()
        this.get_user_details()
    },
    methods:{
        async get_user_details(){
            const sessionStore = usetelecos_session_detailsStore();
            const sessionDetails = await sessionStore.loadtelecos_session_details();
            if (sessionDetails === false) {
                this.$router.push({ name: 'akun' });
            }
            else{
                this.user_id = sessionDetails.userid;
                const data_user = await get_user_data(this.user_id);
                console.log(data_user)
                this.user_name = data_user.user.name;
                this.saldo = data_user.user.wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        handle_toogle_trf(){
            this.pilihan_topup = !this.pilihan_topup
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
    height: 500px;
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
    justify-content: space-between;
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