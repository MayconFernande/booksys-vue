<template>
  <div class="max-w-5xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Agendar Serviço</h1>

    <!-- Serviços -->
    <label class="block mb-2 font-semibold text-center">Escolha um serviço:</label>
    <div class="flex flex-wrap gap-4 mb-6 justify-center">
      <div
        v-for="service in services"
        :key="service.id"
        @click="selectedService = service"
        :class="[ 'cursor-pointer border rounded-lg p-4 w-56 text-center', selectedService?.id === service.id ? 'bg-green-100 border-green-500 shadow-md' : 'bg-white hover:bg-gray-100' ]"
      >
        <img :src="service.photo" class="w-20 h-20 mx-auto mb-2 rounded-full border" :alt="'Imagem do serviço ' + service.name" />
        <h3 class="font-semibold">{{ service.name }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
        <p class="text-xs text-gray-500 mt-2 justify-center">Duração: {{ service.duration }} min</p>
      </div>
    </div>

    <!-- Profissionais -->
    <div v-if="selectedService">
      <label class="block mb-2 font-semibold text-center">Escolha um profissional:</label>
      <div class="flex flex-wrap gap-4 mb-6 justify-center">
        <div
          v-for="prof in selectedService.professionals"
          :key="prof.id"
          @click="selectedProfessional = prof"
          :class="[ 'cursor-pointer border rounded-lg p-4 w-48 text-center', selectedProfessional?.id === prof.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white hover:bg-gray-100' ]"
        >
          <img :src="prof.photo || defaultImg" class="w-20 h-20 mx-auto mb-2 rounded-full object-cover border" :alt="'Imagem do profissional ' + prof.first_name" />
          <p class="font-semibold">{{ prof.first_name }} {{ prof.last_name }}</p>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div v-if="selectedProfessional" class="bg-white border rounded-lg shadow-md p-6 mt-6">
      <label class="block mb-2 font-semibold">Data:</label>
      <input type="date" v-model="form.start_date" class="w-full p-2 border mb-4 rounded" />

      <label class="block mb-2 font-semibold">Hora:</label>
      <select v-model="form.start_time" class="w-full p-2 border mb-6 rounded">
        <option disabled value="">Selecione o horário</option>
        <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
      </select>

      <label class="block mb-2 font-semibold">Nome:</label>
      <input v-model="form.customer_name" type="text" class="w-full p-2 border mb-4 rounded" />

      <label class="block mb-2 font-semibold">Email:</label>
      <input v-model="form.customer_email" type="email" class="w-full p-2 border mb-4 rounded" />

      <label class="block mb-2 font-semibold">Telefone:</label>
      <input v-model="form.customer_phone" type="text" class="w-full p-2 border mb-6 rounded" />

      <button
        @click="submitSchedule"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
      >
        Agendar
      </button>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-4">Agendamento realizado com sucesso!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'


const services = ref([])
const selectedService = ref(null)
const selectedProfessional = ref(null)
const availableTimes = ref([])
const error = ref('')
const success = ref(false)
const allSchedules = ref([])

const form = ref({
  start_date: '',
  start_time: '',
  customer_name: '',
  customer_email: '',
  customer_phone: ''
})

const fetchSchedules = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/schedules/')
    const data = await res.json()
    allSchedules.value = data
  } catch (err) {
    console.error('Erro ao buscar agendamentos', err)
  }
}

const getAvailableTimes = () => {
  const slots = []
  const start = 9 * 60
  const end = 19 * 60

  for (let i = start; i < end; i += 15) {
    const h = String(Math.floor(i / 60)).padStart(2, '0')
    const m = String(i % 60).padStart(2, '0')
    slots.push(`${h}:${m}`)
  }

  const occupied = allSchedules.value
    .filter(s =>
      s.start_date === form.value.start_date &&
      s.employees?.id === selectedProfessional.value?.id
    )
    .map(s => s.start_time)

  return slots.filter(t => !occupied.includes(t))
}

onMounted(async () => {
  await fetchSchedules()
  try {
    const response = await fetch('http://127.0.0.1:8000/api/services/')
    const data = await response.json()
    services.value=data
  } catch (err) {
    error.value = 'Erro ao carregar serviços.'
    console.error(err)
  }
})

watch(
  [() => form.value.start_date, () => selectedProfessional.value?.id],
  () => {
    if (form.value.start_date && selectedProfessional.value) {
      availableTimes.value = getAvailableTimes()
    } else {
      availableTimes.value = []
    }
  }
)

const submitSchedule = async () => {
  error.value = ''
  success.value = false

  if (
    !selectedService.value ||
    !selectedProfessional.value ||
    !form.value.start_date ||
    !form.value.start_time ||
    !form.value.customer_name ||
    !form.value.customer_email ||
    !form.value.customer_phone
  ) {
    error.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/schedules/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start_date: form.value.start_date,
        start_time: form.value.start_time,
        employee_id: selectedProfessional.value.id,
        service_id: selectedService.value.id,
        customer_name: form.value.customer_name,
        customer_email: form.value.customer_email,
        customer_phone: form.value.customer_phone
      })
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(Object.values(errData)[0] || 'Erro ao agendar')
    }

    success.value = true
    form.value = {
      start_date: '',
      start_time: '',
      customer_name: '',
      customer_email: '',
      customer_phone: ''
    }
    selectedService.value = null
    selectedProfessional.value = null
    availableTimes.value = []

    await fetchSchedules()
  } catch (err) {
    error.value = err.message
  }
}
</script>
