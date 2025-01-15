<template>
    <div class="relative rounded-md shadow-sm">
        <input type="text" 
            name="name" 
            id="name_baru"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :value="name_baru"
            @input="handleInput($event)"
            @keypress="blockNonAlphabetic"
            @paste="handlePaste"
            placeholder="Bina Nusantara" 
            maxlength="35" />

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_name"
            id="name_icon">
            <ion-icon name="alert-circle" class="text-red-500 text-xl"></ion-icon>
        </div>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="toogle_name_baru_check"
            id="name_icon">
            <ion-icon name="checkmark-circle" class="text-green-500 text-xl"></ion-icon>
        </div>
    </div>

    <div class="new_name_error" v-if="toogle_name">
        <p class="mt-2 text-sm text-red-600" id="name-error">Nama tidak Valid.</p>
    </div>
</template>

<script>
export default {
    props: {
        parent_component_nama: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            toogle_name: false,
            toogle_name_baru_check: false,
            name_baru: ''
        }
    },
    mounted() {
        this.name_baru = this.parent_component_nama
    },
    watch: {
        parent_component_nama(newVal) {
            this.name_baru = newVal
        },
        name_baru: {
            handler(newVal) {
                this.validate_name()
            },
            immediate: true
        }
    },
    emits: ['update:parent_component_nama', 'nama_status'],
    methods: {
        blockNonAlphabetic(e) {
            if (!/^[a-zA-Z\s]$/.test(e.key)) {
                e.preventDefault();
            }
        },
        handlePaste(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const cleanedText = pastedText.replace(/[^a-zA-Z\s]/g, '');
            
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const currentValue = this.name_baru;
            this.name_baru = currentValue.substring(0, start) + cleanedText + currentValue.substring(end);
            
            this.$nextTick(() => {
                e.target.setSelectionRange(start + cleanedText.length, start + cleanedText.length);
            });
        },
        handleInput(e) {
            const cleanedValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            this.name_baru = cleanedValue;
            this.validate_name();
        },
        updateValue(value) {
            this.name_baru = value;
            this.validate_name();
        },
        validate_name() {
            let isNameValid = null;
            
            if (this.name_baru.length < 4) {
                isNameValid = null;
            } else {
                isNameValid = /^[a-zA-Z\s]+$/.test(this.name_baru);
            }

            this.toogle_name = isNameValid === false;
            this.toogle_name_baru_check = isNameValid === true;
            this.$emit('nama_status', isNameValid);
            this.$emit('update:parent_component_nama', this.name_baru);
        }
    }
}
</script>