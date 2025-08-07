<!-- <template> 
  <div class="p-8 text-center">
    <h1 class="text-2xl font-bold mb-6">Sobre Nós</h1>

    <p class="mb-6 text-gray-700 max-w-xl mx-auto">
      Bem-vindo à nossa empresa! Aqui você encontra informações e redes sociais para nos acompanhar.
    </p>

    <div class="flex justify-center gap-6 text-2xl text-gray-500">
      <v-btn
        v-if="social.whatsapp"
        :href="social.whatsapp"
        target="_blank"
      >
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
      <v-btn
        v-if="social.instagram"
        :href="social.instagram"
        target="_blank"
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        v-if="social.facebook"
        :href="social.facebook"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      
    </div>
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
    const data = await res.json()
    social.value = data
  } catch (error) {
    console.error('Erro ao carregar links sociais:', error)
  }
})
</script> -->