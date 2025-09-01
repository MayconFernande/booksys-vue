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
        class="mx-auto"
        max-width="344"
        :elevation="selectedService?.id === service.id ? 8 : 2"
        :color="selectedService?.id === service.id ? 'grey lighten-4' : 'white'"
      >
        <v-img
          :src="service.photo"
          height="200px"
          cover
          :alt="'Imagem do serviço ' + service.name"
        ></v-img>

        <v-card-title class="justify-center font-weight-medium">
          {{ service.name }}
        </v-card-title>

        <v-card-subtitle class="text-body-2 text--secondary">
          {{ service.shortDescription || 'Serviço disponível' }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="primary" text @click="$emit('select', service)">
            Selecionar
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            :icon="show[service.id] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="toggleShow(service.id)"
          ></v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show[service.id]">
            <v-divider></v-divider>

            <v-card-text>
              {{ service.description }}
            </v-card-text>

            <v-card-text class="text-caption mt-2">
              <strong>Duração:</strong> {{ service.duration }} min
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  selectedService: Object
})

const services = ref([])
const error = ref('')
const show = reactive({})

const toggleShow = (id) => {
  show[id] = !show[id]
}

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
