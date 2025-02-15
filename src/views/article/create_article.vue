<template>
    <div class="notification_success">
        <div aria-live="assertive"
            class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition"
                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="save_success"
                        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <ion-icon name="checkmark-circle" class="text-2xl mb-0 text-green-400"></ion-icon>
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900">Pembuatan artikel baru berhasil</p>
                                    <p class="mt-1 text-sm text-gray-500">Artikel akan di tampilkan pada halaman Telecos</p>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" @click="save_success = false"
                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <ion-icon name="close" class="h-5 w-5"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    <div class="notification_error">
        <div aria-live="assertive"
            class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition"
                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="showErrors"
                        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <ion-icon name="alert-circle" class="text-2xl mb-0 text-red-400"></ion-icon>
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900">Terdapat kesalahan pada form</p>
                                    <ul class="mt-1 text-sm text-gray-500">
                                        <li v-for="(error, index) in formErrors" :key="index" class="mt-0.5">
                                            {{ error }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" @click="showErrors = false"
                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <ion-icon name="close" class="h-5 w-5"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    <div id="create_new_article" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="akun_header mb-6 px-4 sm:px-0 mt-5">
            <h1>Buat Artikel Baru</h1> 
        </div>
        <!-- <div class="all">
            {{ content["ops"] }}
        </div> -->
        <div class="split">
            <div>
                <label for="text" class="block text-sm font-medium leading-6 text-gray-900">Judul Artikel<span
                        class="text-red-500">*</span></label>
                <div class="mt-2">
                    <input type="text" name="judul" id="judul" v-model="judul"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Judul Artikel" />
                </div>
            </div>

            <div>
                <label for="kategori" class="block text-sm font-medium leading-6 text-gray-900">Kategori<span
                        class="text-red-500">*</span></label>
                <select id="kategori" name="kategori" v-model="kategori"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="1" disabled="disabled">Pilih Kategori Artikel</option>
                    <option value="kecantikan">Kecantikan</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="penyakit">Penyakit</option>
                    <option value="diet & nutrisi">Diet & Nutrisi</option>
                    <option value="makanan sehat">Makanan Sehat</option>
                </select>
            </div>

            <div>
                <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Isi Artikel<span
                        class="text-red-500">*</span></label>
                <div class="mt-2 w-full rounded-md border-0">
                    <quill-editor ref="quillEditor" :content="content" @update:content="onEditorChange"
                        :options="editorOptions" id="quill_editor" />
                </div>

                <div class="center_the_label">
                    <p id="text_label" class="text-gray-400">Mohon tidak menambahkan foto melalui kolom isi artikel.
                        Anda dapat mengunggah foto tambahan di bagian edit artikel.</p>
                </div>
            </div>

            <!-- <div class="allImage">
                <div class="left_side thumbnail_section">
                    <label for="thumbnail_image" class="block text-sm font-medium leading-6 text-gray-900">
                        Atur Thumbnail Artikel<span class="text-red-500">*</span>
                    </label>
                    <div class="drop-zone thumbnail_drop" @dragover.prevent @drop.prevent="onDrop"
                        @click="triggerFileInput">
                        <div class="fileinputan" v-if="!imageFile">
                            <ion-icon name="image"></ion-icon>
                            <p id="thumbnail_drag_text" class="file_drag_text">
                                Drag & Drop foto yang akan di set sebagai thumbnail artikel
                            </p>
                            <p class="file_drag_text">
                                Foto yang diterima dengan format jpg, jpeg, png dengan ukuran maksimal 5 mb
                            </p>
                        </div>
                        <div v-else>
                            <div class="center_all">

                                <img :src="imagePreview" alt="Image Preview" class="image-preview" />

                                <p id="image_file_name">{{ imageFile.name }}</p>
                                <button @click.stop="removeImage" type="button"
                                    class="mt-3 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2">
                                    <ion-icon name="trash"></ion-icon>
                                    Hapus Foto
                                </button>

                            </div>

                        </div>
                        <input type="file" ref="fileInput" @change="onFileChange" accept="image/jpeg, image/png"
                            required hidden>
                    </div>
                    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
                </div>

                <div class="right_side additional_section">
                    <label for="additional_image" class="block text-sm font-medium leading-6 text-gray-900">
                        Tambah Foto Artikel (Opsional)
                    </label>
                    <div class="drop-zone additional_drop" @dragover.prevent @drop.prevent="onDropSecond"
                        @click="triggerSecondFileInput">
                        <div class="fileinputan" v-if="additionalImages.length === 0">
                            <ion-icon name="images"></ion-icon>
                            <p id="additional_drag_text" class="file_drag_text">
                                Drag & Drop maksimal 5 foto tambahan untuk artikel
                            </p>
                            <p class="file_drag_text">
                                Foto yang diterima dengan format jpg, jpeg, png dengan ukuran maksimal 5 mb
                            </p>
                        </div>
                        <div v-else class="additional-images-container">
                            <div v-if="additionalImages.length < 5" class="add-more-images">
                                <ion-icon name="add-circle"></ion-icon>
                                <p>Tambah Foto Lainnya</p>
                                <p class="text-sm text-gray-500 mt-2">{{ additionalImages.length }}/5 foto telah dipilih
                                </p>

                            </div>

                            <div v-for="(image, index) in additionalImages" :key="index" class="additional-image-item">
                                <img :src="image.preview" :alt="'Additional Image ' + (index + 1)"
                                    class="additional-image-preview" />
                                <p class="image-file-name">{{ image.file.name }}</p>
                                <button @click.stop="removeAdditionalImage(index)" type="button"
                                    class="mt-3 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2">

                                    <ion-icon name="trash"></ion-icon>
                                    Hapus Foto
                                </button>
                            </div>

                        </div>
                        <input type="file" ref="secondFileInput" @change="onSecondFileChange"
                            accept="image/jpeg, image/png" multiple hidden>
                    </div>
                    <p v-if="secondErrorMessage" class="text-red-500 text-sm mt-2">{{ secondErrorMessage }}</p>
                    </div>

            </div> -->


            <div class="button_wrapper">
                <button id="submit_button" @click.prevent="handle_article_submit"
                    class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400">
                    Buat Artikel</button>
            </div>

        </div>

    </div>

    <div class="if_mobile">
        <div class="center_all">
            <p class="text-gray-400">Mohon maaf, fitur ini tidak tersedia di perangkat mobile. Silakan gunakan perangkat
                komputer atau laptop untuk membuat artikel baru.</p>
        </div>
    </div>
</template>
<script>
import { create_new_artikel } from '@/components/logic/API/artikel/artikel_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/admin/admin_save_session_service';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
    components: {
        QuillEditor
    },
    mounted() {
        this.try_get_session();
        this.$nextTick(() => {
            this.setupMutationObserver();
            this.disableImageHandling();
        });
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    data() {
        return {
            editorOptions: {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, false] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                    ],
                    clipboard: {
                        matchVisual: false,
                        matchers: []
                    },
                    keyboard: {
                        bindings: {
                            tab: false,
                            'remove tab': false,
                            handleDrop: false,
                            handlePaste: false
                        }
                    }
                },
                formats: [
                    'header',
                    'bold', 'italic', 'underline',
                    'link', 'blockquote', 'code-block',
                    'list', 'bullet',
                    'indent',
                    'direction',
                    'size',
                    'color', 'background',
                    'align'
                ]
            },
            expertId: '',
            imageFile: null,
            imagePreview: '',
            response: '',
            errorMessage: '',
            judul: '',
            kategori: '1',
            content: '',
            save_success: false,
            formErrors: [],
            showErrors: false,
            observer: null,
            secondImageFile: null,
            secondImagePreview: '',
            secondErrorMessage: '',
            additionalImages: [], // Array to store multiple images
            maxAdditionalImages: 5,
        }
    },
    methods: {
        onEditorChange(newContent) {
            this.content = newContent
        },

        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.load_admin_telecos(); 
                // console.log(sessionDetails)
                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun_admin' });
                    
                } else { 
                        this.expertId = sessionDetails.userid 
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            }
        },

        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        triggerSecondFileInput() {
            this.$refs.secondFileInput.click();
        },

        validateFile(file, type) {
            const maxSize = 5 * 1024 * 1024;
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            if (!allowedTypes.includes(file.type)) {
                const message = 'Format file harus jpg, jpeg, atau png';
                if (type === 'thumbnail') {
                    this.errorMessage = message;
                } else {
                    this.secondErrorMessage = message;
                }
                return false;
            }

            if (file.size > maxSize) {
                const message = 'Ukuran file tidak boleh lebih dari 5MB';
                if (type === 'thumbnail') {
                    this.errorMessage = message;
                } else {
                    this.secondErrorMessage = message;
                }
                return false;
            }

            if (type === 'thumbnail') {
                this.errorMessage = '';
            } else {
                this.secondErrorMessage = '';
            }
            return true;
        },

        onFileChange(event) {
            const file = event.target.files[0];
            if (file && this.validateFile(file, 'thumbnail')) {
                this.handleFile(file);
            }
            event.target.value = '';
        },

        onDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file && this.validateFile(file)) {
                this.handleFile(file);
            }
        },

        handleFile(file) {
            this.imageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        removeImage() {
            this.imageFile = null;
            this.imagePreview = '';
            this.errorMessage = '';
        },

        onSecondFileChange(event) {
            const files = Array.from(event.target.files);
            this.handleMultipleFiles(files);
            event.target.value = '';
        },

        onDropSecond(event) {
            const files = Array.from(event.dataTransfer.files);
            this.handleMultipleFiles(files);
        },

        handleMultipleFiles(files) {
            const remainingSlots = this.maxAdditionalImages - this.additionalImages.length;
            if (remainingSlots <= 0) {
                this.secondErrorMessage = 'Maksimal 5 foto yang dapat diunggah';
                return;
            }

            const validFiles = files.slice(0, remainingSlots).filter(file =>
                this.validateFile(file, 'additional')
            );

            validFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.additionalImages.push({
                        file: file,
                        preview: e.target.result
                    });
                };
                reader.readAsDataURL(file);
            });
        },

        removeAdditionalImage(index) {
            this.additionalImages.splice(index, 1);
        },

        cek_kalo_content_kosong(content) {
            if (!content) return true;

            try {
                if (typeof content === 'string') {
                    return content.trim().length === 0;
                }

                if (typeof content === 'object') {
                    if (content.ops && content.ops.length === 1) {
                        const firstOp = content.ops[0];
                        return firstOp.insert === '\n' && Object.keys(firstOp).length === 1;
                    }

                    return false;
                }

                return true;
            } catch (error) {
                console.error('Error checking Quill content:', error);
                return true;
            }
        },

        check_all_variable_is_not_empty() {
            this.formErrors = [];

            if (!this.judul?.trim()) {
                this.formErrors.push('Judul artikel tidak boleh kosong');
            }

            if (this.kategori === '1') {
                this.formErrors.push('Pilih kategori artikel');
            }

            if (this.cek_kalo_content_kosong(this.content)) {
                this.formErrors.push('Isi artikel tidak boleh kosong');
            }

            // if (!this.imageFile) {
            //     this.formErrors.push('Upload foto thumbnail artikel');
            // }

            // if (this.additionalImages.length === 0) {
            //     this.formErrors.push('Upload minimal 1 foto artikel tambahan');
            // }

            if (!this.expertId) {
                this.formErrors.push('Sesi expert tidak valid');
            }

            return this.formErrors.length === 0;
        },

        // async uploadImage() {
        //     if (!this.imageFile) {
        //         return null;
        //     }

        //     const formData = new FormData();
        //     formData.append("image", this.imageFile);
        //     formData.append("articleId", this.articleId);

        //     try {
        //         const response = await fetch("https://claudio.codes/telecos-be/images/upload", {
        //             method: "POST",
        //             body: formData,
        //         });

        //         const result = await response.json();

        //         if (response.ok && result.status === 1) {
        //             return result.file.filename;
        //         } else {
        //             throw new Error(result.message || 'Error uploading image');
        //         }
        //     } catch (error) {
        //         console.error("Upload error:", error);
        //         this.formErrors.push('Gagal mengunggah gambar thumbnail');
        //         return null;
        //     }
        // },

        async handle_article_submit() {
            try {
                if (!this.check_all_variable_is_not_empty()) {
                    this.showErrors = true;
                    setTimeout(() => {
                        this.showErrors = false;
                    }, 5000);
                    return;
                }

                // Upload thumbnail image first
                

                // Create article with thumbnail filename
                const response = await create_new_artikel(
                    "admin",
                    this.expertId,
                    this.judul,
                    this.kategori,
                    this.content,
                );

                console.log(response);

                if (response.status === 1) {
                    this.$router.push({ name: 'berhasil_buat_artikel_admin' });
                } else {
                    this.errorMessage = 'Gagal membuat artikel baru. Silakan coba lagi.';
                }

                // const thumbnailFilename = await this.uploadImage();
                // if (!thumbnailFilename) {
                //     this.formErrors.push('Gagal mengunggah gambar thumbnail');
                //     this.showErrors = true;
                //     return;
                // }

                
            } catch (error) {
                console.error('Error submitting article:', error);
                this.formErrors = ['Terjadi kesalahan. Silakan coba lagi.'];
                this.showErrors = true;
                setTimeout(() => {
                    this.showErrors = false;
                }, 5000);
            }
        },

        setupMutationObserver() {
            const quillEditor = document.querySelector('#quill_editor');
            if (!quillEditor) return;

            this.observer = new MutationObserver((mutations) => {
                mutations.forEach(() => {
                    // Handle any necessary updates when editor content changes
                });
            });

            this.observer.observe(quillEditor, {
                childList: true,
                subtree: true,
                characterData: true
            });
        },

        disableImageHandling() {
            const editor = document.querySelector('#quill_editor');
            if (editor) {
                editor.addEventListener('drop', (e) => {
                    e.preventDefault();
                    return false;
                });
                editor.addEventListener('paste', (e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/plain');
                    document.execCommand('insertText', false, text);
                });
            }
        },
    }
}
</script>
<style>
.split {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 100px;
    margin-top: 0px;
}

div.akun_header h1 {
    font-size: 25px;
    font-weight: bold;
}

.center_the_label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

#text_label {
    font-size: 12px;
}

.ql-toolbar.ql-snow {
    border-radius: 0.375rem 0.375rem 0 0;
}

#quill_editor {
    border-radius: 0 0 0.375rem 0.375rem;
    min-height: 400px;
}

.ql-editor {
    min-height: 400px;
}

.button_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}


p#file_drag_text {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 13px;
}

.drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.drop-zone p {
    margin: 0;
    color: #999;
}

.image-preview {
    max-width: 100%;
    margin: 10px 0;
    max-height: 20rem;
}

.image_file_name {
    margin-top: 10px;
    margin-bottom: 10px;
}

#image_file_name{
    font-size: 12px;
}

div.additional-image-item p.image-file-name {
    font-size: 12px;
}



.response {
    margin-top: 20px;
}

.center_all {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

div.drop-zone div.fileinputan ion-icon {
    font-size: 80px;
    color: #ccc;
    margin-top: 25px;
    margin-bottom: 25px;
}

.fileinputan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.notification_error {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 50;
}

ul li:first-child {
    margin-top: 0;
}


.allImage {
    display: flex;
    justify-content: space-between;
}

.thumbnail_section,
.additional_section {
    width: 49.5%;
}

.thumbnail_drop,
.additional_drop {
    border: 2px dashed #ccc;
}

.file_drag_text {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 13px;
}

#thumbnail_drag_text {
    color: #666;
}

#additional_drag_text {
    color: #666;
}

.additional-images-container {
    display: flex;
    /* Change from grid to flex */
    gap: 1rem;
    padding: 1rem;
    overflow-x: auto;
    /* Add horizontal scroll */
    white-space: nowrap;
    /* Keep items in a single line */
    -webkit-overflow-scrolling: touch;
    /* Smooth scrolling on iOS */
    scrollbar-width: thin;
    /* Firefox scrollbar */
    min-height: 220px;
    /* Accommodate the images and text */
}

/* Style the scrollbar */
.additional-images-container::-webkit-scrollbar {
    height: 8px;
}

.additional-images-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.additional-images-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.additional-image-item {
    flex: 0 0 auto;
    /* Prevent items from shrinking */
    width: 150px;
    /* Fixed width for each item */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}
.additional-image-preview{
    height: 120px;
}
.image-preview{
    height: 120px;
}

.add-more-images {
    flex: 0 0 auto;
    /* Prevent shrinking */
    width: 150px;
    /* Match the width of image items */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;
    border: 2px dashed #ccc;
    border-radius: 0.375rem;
    cursor: pointer;
}

.add-more-images ion-icon {
    font-size: 2rem;
    color: #ccc;
}

.add-more-images p {
    color: #666;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

/* Mobile responsiveness */
.if_mobile {
    display: none; /* Hidden by default */
}

@media screen and (max-width: 768px) {
    #create_new_article {
        display: none; /* Hide the main content on mobile */
    }
    
    .if_mobile {
        display: block;
        padding: 2rem 1rem;
        text-align: center;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .if_mobile p {
        max-width: 300px;
        margin: 0 auto;
        line-height: 1.5;
    }
}
</style>