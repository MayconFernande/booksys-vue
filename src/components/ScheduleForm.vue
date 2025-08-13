<template>
  <div class="bg-white border rounded-lg shadow-md p-6 mt-6" v-if="selectedProfessional">
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

    <button @click="submitSchedule" class="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
      Agendar
    </button>

    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-4">Agendamento realizado com sucesso!</p>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps({
  selectedProfessional: Object,
  selectedService: Object,
  allSchedules: Array
})

const form = ref({
  start_date: '',
  start_time: '',
  customer_name: '',
  customer_email: '',
  customer_phone: ''
})
const error = ref('')
const success = ref(false)
const availableTimes = ref([])

watch([() => form.value.start_date, () => props.selectedProfessional?.id], () => {
  try {
    const res = fetch(`http://127.0.0.1:8000/api/schedules/available_hours/?employee_id=${props.selectedProfessional.id}&date=${form.value.start_date}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      availableTimes.value = data.available_hours
    })
  } catch (err) {
    console.log(err)
  }
})

const submitSchedule = async () => {
  error.value = ''
  success.value = false

  if (
    !props.selectedService ||
    !props.selectedProfessional ||
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_date: form.value.start_date,
        start_time: form.value.start_time,
        employee_id: props.selectedProfessional.id,
        service_id: props.selectedService.id,
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
    form.value = { start_date:'', start_time:'', customer_name:'', customer_email:'', customer_phone:'' }
  } catch (err) {
    error.value = err.message
  }
}
</script>
