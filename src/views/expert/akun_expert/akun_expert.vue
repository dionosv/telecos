<template>
    <div class="logout_button" v-if="onsession">
        <Pengaturan_akun></Pengaturan_akun>
    </div>
    <div class="wrapper_akun" v-if="!onsession">
        <Banner_akun_expert></Banner_akun_expert>

        <Masuk v-if="user_have_account" @change_phase="user_have_account = $event" :additional_param="additional_param">
        </Masuk>
        <Daftar v-if="!user_have_account" @change_phase="user_have_account = $event"></Daftar>
    </div>
</template>

<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session';
import Masuk from './masuk_expert.vue';
import Daftar from './daftar_expert.vue';
import Pengaturan_akun from './pengaturan_expert.vue';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import { url_preprocess } from '@/components/logic/user_url_preprocess/user_preprocess';
import Banner_akun_expert from '@/components/banner/banner_akun_expert.vue';

export default {
    components: { Pengaturan_akun, Daftar, Masuk, Banner_akun_expert },
    mounted() {
        always_scroll_on_top();
        this.try_get_session();
        this.get_param();
    },
    data() {
        return {
            onsession: false,
            user_have_account: true,
            additional_param: []
        }
    },
    methods: {
        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();
                if (sessionDetails === false) {
                    this.onsession = false;
                } else {
                    if (sessionDetails.phase == 1) {
                        this.user_have_account = true;
                        this.onsession = true;
                        this.handle_add_param();
                    }
                    else if (sessionDetails.phase == 2) {
                        this.user_have_account = false;
                        this.$router.push({ name: 'otp_expert' });
                        this.onsession = false;
                    }
                    else if (sessionDetails.phase == 3) {
                        this.onsession = false;
                        this.$router.push({ name: 'otp_lupa_kata_sandi' });
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            }
        },
        get_param() {
            try {
                const { param_1, param_2 } = this.$route.params;
                if (param_1 && param_2) {
                    this.additional_param = [param_1, param_2];
                }
                if (param_1 && !param_2) {
                    this.$router.push({ name: 'akun' });
                }
                
            } catch (error) {
                console.error('Error getting route parameters:', error);
            }
        },
        handle_add_param() {
            if (this.additional_param.length > 0) {
                url_preprocess(this.additional_param);
            }
        }
    },
}
</script>

<style></style>