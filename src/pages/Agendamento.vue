<template>
  <v-container class="py-10" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold text-center mb-6">
          Agendar Serviço
        </h1>
        <Services :selectedService="selectedService" @select="selectedService = $event" />
        <Employees v-if="selectedService" :professionals="selectedService.professionals" :selectedProfessional="selectedProfessional" @select="selectedProfessional = $event"/>
        <ScheduleForm v-if="selectedProfessional" :selectedService="selectedService" :selectedProfessional="selectedProfessional" :allSchedules="allSchedules"/>
        <p v-if="error" class="error--text text-center mt-4">{{ error }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Services from '../components/Services.vue'
import Employees from '../components/Employees.vue'
import ScheduleForm from '../components/ScheduleForm.vue'

const selectedService = ref(null)
const selectedProfessional = ref(null)
const allSchedules = ref([])
const error = ref('')

const fetchSchedules = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/schedules/')
    allSchedules.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao carregar horários.'
  }
}

onMounted(async () => {
  await fetchSchedules()
})
</script>
