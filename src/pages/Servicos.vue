<template>
  <v-container class="py-6">
    <v-row justify="center" align="stretch" dense>
      <v-col
        v-for="service in services"
        :key="service.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" elevation="2">
          <v-img
            :src="service.photo || defaultImg"
            height="100px"
            class="rounded-top"
            :alt="'Imagem do serviço ' + service.name"
            cover
          ></v-img>
          <v-card-title class="justify-center text-center">{{ service.name }}</v-card-title>
          <v-card-text class="text-center">
            <p class="text-sm text-gray-600 mb-2">{{ service.description }}</p>
            <p class="text-xs text-gray-500">Duração: {{ service.duration }} min</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" class="mt-4" dense text>
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const services = ref([])
const error = ref('')
const defaultImg = '/src/assets/images/default-service.png'

const fetchServices = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/services/')
    if (!res.ok) throw new Error('Erro ao carregar os serviços')
    services.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao carregar os serviços.'
  }
}

onMounted(() => {
  fetchServices()
})
</script>
