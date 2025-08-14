<template>
  <div class="max-w-5xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Agendar Serviço</h1>

    <Services :selectedService="selectedService" @select="selectedService = $event" />
    <Employees v-if="selectedService" :professionals="selectedService.professionals" :selectedProfessional="selectedProfessional" @select="selectedProfessional = $event" />
    <ScheduleForm v-if="selectedProfessional" :selectedService="selectedService" :selectedProfessional="selectedProfessional" :allSchedules="allSchedules" />
    
    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
  </div>
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
  }
}

onMounted(async () => {
  await fetchSchedules()
})
</script>
