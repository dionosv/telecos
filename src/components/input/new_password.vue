<template>

    <div class="relative rounded-md shadow-sm">
        <input type="password" name="password" id="password_baru"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="pw_baru" @input="validatePassword(this.pw_baru)" />


        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_password" id="pw_icon">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_pw_baru_check" id="pw_icon">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
        </div>

    </div>

    <div class="new_password_error" v-if="toogle_password">
        <p class="mt-2 text-sm text-red-600" id="email-error">Password tidak valid.</p>
        <p class="mt-2 text-sm text-gray-400" id="email-error">Password harus minimal 8 karakter, memiliki minimal 1
            huruf kapital dan 1 simbol</p>
    </div>

</template>

<script>
export default {
    data() {
        return {
            pw_baru: "",
            toogle_password: false,
            toogle_pw_baru_check: false,
            pw_status:false
        }
    },
    emits: ['pw_element','pw_status'],
    methods: {
        validatePassword(password) {
            let isPasswordValid = null;
            if (password.length >= 8) {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                isPasswordValid = hasUpperCase && hasSymbol;
            } else {
                isPasswordValid = null;
            }

            if (isPasswordValid == true) {
                this.toogle_password = false;
                this.toogle_pw_baru_check = true;
                this.$emit('pw_element', this.pw_baru);
                this.$emit('pw_status', true);
            }

            if (isPasswordValid == null) {
                this.toogle_password = false;
                this.toogle_pw_baru_check = false;
                this.$emit('pw_element', null);
                this.$emit('pw_status', null);
            }

            if (isPasswordValid == false) {
                this.toogle_password = true;
                this.toogle_pw_baru_check = false;
                this.$emit('pw_element', null);
                this.$emit('pw_status', false);
            }
        },
        resetPasswordInput() {
            this.pw_baru = "";
            this.toogle_password = false;
            this.toogle_pw_baru_check = false;
            this.pw_status = false;
            this.$emit('pw_element', null);
            this.$emit('pw_status', null);
        }
    },

}
</script>

<style> 

.new_password_error {
    margin-top:15px;
    animation: flashIn 1s ease-in-out;
}

#pw_icon {
    animation: flashIn 0.5s ease-in-out;
}

@keyframes flashIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
</style>