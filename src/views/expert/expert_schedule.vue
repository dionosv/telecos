<template>
  <div>
    <kalender_available_expert 
      v-if="expertId" 
      :expertId="expertId"

<script>
import kalender_available_expert from '../../components/kalender/kalender_available_expert.vue'

export default {
  components: {
    kalender_available_expert
  },
  data() {
    return {
      currentExpertId: null
    }
  },
  created() {
    // Get expert ID from store or local storage
    this.currentExpertId = localStorage.getItem('expert_id')
    if (!this.currentExpertId) {
      // Redirect to login or handle error
      this.$router.push('/login')
    }
  }
}
</script>
