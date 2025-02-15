<template>
  <div class="container">
    <div class="akun_header mb-6 px-4 sm:px-0 mt-5">
          <h1>Ganti Foto Profil</h1>
    </div>
    <!-- <input type="text" v-model="userId" placeholder="Enter User ID" required> -->
    <div class="drop-zone" @dragover.prevent @drop.prevent="onDrop" @click="triggerFileInput">
      <div class="fileinputan" v-if="!imageFile">
        <ion-icon name="image"></ion-icon> 
        <p id="file_drag_text">
          Drag & Drop foto yang akan di set sebagai profile picture
        </p>
        <p id="file_drag_text">
          Foto yang diterima dengan format jpg,
          jpeg, png dengan ukuran maksimal 5 mb
        </p>
      </div>
      <div v-else>
        <img :src="imagePreview" alt="Image Preview" class="image-preview" />
        <p>{{ imageFile.name }}</p>
      </div>
      <input type="file" ref="fileInput" @change="onFileChange" accept="image/jpeg, image/png" required hidden>
    </div>
    <button @click="uploadImage"
      class="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:bg-gray-400">
        Ganti Foto Profil
      </button>
    <div class="response" v-html="response"></div>
  </div>
</template>

<script>
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session_service';

export default {
  data() {
    return {
      userId: '',
      imageFile: null,
      imagePreview: '',
      response: ''
    };
  },
  mounted(){
    this.try_get_session();
    // console.log(this.userId)
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (this.isValidImage(file) && this.isValidSize(file)) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      } else if (!this.isValidSize(file)) {
        this.response = "File size exceeds 5 MB. Please upload a smaller image.";
      } else {
        this.response = "Invalid file format. Please upload a jpg, jpeg, or png image.";
      }
    },
    onDrop(event) {
      const file = event.dataTransfer.files[0];
      if (this.isValidImage(file) && this.isValidSize(file)) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      } else if (!this.isValidSize(file)) {
        this.response = "File size exceeds 5 MB. Please upload a smaller image.";
      } else {
        this.response = "Invalid file format. Please upload a jpg, jpeg, or png image.";
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    isValidImage(file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      return file && validTypes.includes(file.type);
    },
    isValidSize(file) {
      const maxSize = 5 * 1024 * 1024; // 5 MB
      return file && file.size <= maxSize;
    },
    async try_get_session() {
      try {
        const sessionStore = usetelecos_session_detailsStore();
        const sessionDetails = await sessionStore.loadtelecos_session_details();
        if (sessionDetails === false) {
          this.$router.push({ name : "home_expert" });
        } else {
          if (sessionDetails.phase == 1) {
            this.userId = sessionDetails["userid"]
          }
        }
      } catch (error) {
        console.error('Failed to load session details:', error);
      }
    },

    async uploadImage() {
      if (!this.userId || !this.imageFile) {
        this.response = "Please enter a User ID and select an image.";
        return;
      }

      const formData = new FormData();
      formData.append("expertId", this.userId);
      formData.append("image", this.imageFile);

      try {
        const response = await fetch("https://claudio.codes/telecos-be/images/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          this.response = `<p>${result.message}</p><p>File: ${result.file.filename}</p>`;
        } else {
          this.response = `<p>Error: ${result.message}</p>`;
        }
      } catch (error) {
        this.response = "Error uploading image.";
        console.error("Upload error:", error);
      }
    }

  }
};
</script>

<style scoped> 

.container {
  max-width: 500px; 
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: #fff;
  padding: 20px; 
}

p#file_drag_text{
  margin-top:5px;
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
}

.drop-zone p {
  margin: 0;
  color: #999;
}

.image-preview {
  max-width: 100%;
  margin: 10px 0;
}

.response {
  margin-top: 20px;
}
div.drop-zone div.fileinputan ion-icon{
  font-size: 80px;
  color: #ccc;
  margin-top: 25px;
  margin-bottom: 25px;
}

div.akun_header h1 {
    font-size: 25px;
    font-weight: bold;
}
</style>