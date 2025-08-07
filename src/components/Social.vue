<!-- src/components/Social.vue -->
<template>
  <div class="flex gap-3">
    <v-btn v-if="social.whatsapp" :href="social.whatsapp" target="_blank" icon color="green">
      <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn v-if="social.instagram" :href="social.instagram" target="_blank" icon color="pink">
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-btn v-if="social.facebook" :href="social.facebook" target="_blank" icon color="blue">
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const social = ref({
  whatsapp: null,
  instagram: null,
  facebook: null,
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/api/social/')
    social.value = await res.json()
  } catch (err) {
    console.error('Erro ao buscar redes sociais:', err)
  }
})
</script>
