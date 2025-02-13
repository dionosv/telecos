<template>
    <div>
        <Masuk_admin v-if="!islogin"></Masuk_admin>
        <Pengaturan_admin v-if="islogin"></Pengaturan_admin>
    </div>
</template>
<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/admin/admin_save_session';
import Masuk_admin from './masuk_admin.vue';
import Pengaturan_admin from './pengaturan_admin.vue';

export default {
    components: { Masuk_admin, Pengaturan_admin },

    data() {
        return {
            islogin: false
        }
    },

    mounted() {
        this.cek_login_admin();
    },

    methods: {
        cek_login_admin() {
            const x = usetelecos_session_detailsStore();
            const login_data = x.load_admin_telecos();
            if (!x.load_admin_telecos()) {
                this.islogin = false;
            } else {
                this.islogin = true;
            }
        }

    }

}
</script>
<style></style>