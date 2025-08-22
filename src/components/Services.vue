<template>
  <v-row class="mb-6" justify="center" align="stretch" dense>
    <v-col
      v-for="service in services"
      :key="service.id"
      cols="18"
      sm="12"
      md="4"
      lg="3"
    >
      <v-card
        :elevation="selectedService?.id === service.id ? 8 : 2"
        :color="selectedService?.id === service.id ? 'grey lighten-4' : 'white'"
        class="cursor-pointer text-center"
        @click="$emit('select', service)"
      >
        <v-img
          :src="service.photo"
          height="100"
          width="150"
          class="mx-auto my-6 rounded-circle"
          :alt="'Imagem do serviço ' + service.name"
        ></v-img>

        <v-card-title class="justify-center font-weight-medium">
          {{ service.name }}
        </v-card-title>

        <v-card-text class="text-body-2 text--secondary">
          {{ service.description }}
        </v-card-text>

        <v-card-text class="text-caption mt-2">
          Duração: {{ service.duration }} min
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  selectedService: Object
})

const services = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/services/')
    services.value = await res.json()
  } catch (err) {
    error.value = 'Erro ao carregar serviços.'
    console.error(err)
  }
})
</script>
