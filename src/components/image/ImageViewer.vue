<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click="close">
    <div class="relative w-full h-full flex items-center justify-center p-4">
      <button @click="close" class="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
        <ion-icon name="close" class="w-8 h-8"></ion-icon>
      </button>
      <img 
        :src="imageUrl" 
        alt="Image preview" 
        class="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
        @click.stop
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.fixed {
  touch-action: none; /* Prevents scrolling on mobile */
}

img {
  margin: auto;
  display: block;
}
</style>
