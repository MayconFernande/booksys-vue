<template>
  <v-card class="pa-6 mt-6" outlined>
    <!-- Data -->
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template #activator="{ props: menuProps }">
        <v-text-field
          v-model="form.start_date"
          label="Data"
          readonly
          v-bind="menuProps"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="form.start_date"
        @update:model-value="menu = false"
        no-title
      ></v-date-picker>
    </v-menu>

    <!-- Horário -->
    <v-select
      v-model="form.start_time"
      :items="availableTimes"
      label="Hora"
      :disabled="!availableTimes.length"
      class="mt-4"
    ></v-select>

    <!-- Nome -->
    <v-text-field
      v-model="form.customer_name"
      label="Nome"
      class="mt-4"
    ></v-text-field>

    <!-- Email -->
    <v-text-field
      v-model="form.customer_email"
      label="Email"
      type="email"
      class="mt-4"
    ></v-text-field>

    <!-- Telefone -->
    <v-text-field
      v-model="form.customer_phone"
      label="Telefone"
      class="mt-4"
    ></v-text-field>

    <!-- Botão -->
    <v-btn
      class="mt-6"
      color="primary"
      @click="submitSchedule"
    >
      Agendar
    </v-btn>

    <!-- Mensagens -->
    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
      dense
      border="start"
      colored-border
    >
      {{ error }}
    </v-alert>

    <v-alert
      v-if="success"
      type="success"
      class="mt-4"
      dense
      border="start"
      colored-border
    >
      Agendamento realizado com sucesso!
    </v-alert>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedService: Object,
  selectedProfessional: Object,
  allSchedules: Array
})

const form = ref({
  start_date: '', // vai conter YYYY-MM-DD
  start_time: '',
  customer_name: '',
  customer_email: '',
  customer_phone: ''
})

const availableTimes = ref([])
const error = ref('')
const success = ref(false)
const menu = ref(false)

const formatDateForAPI = (date) => {
  if (!date) return ''
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Buscar horários disponíveis
const fetchAvailableTimes = async () => {
  error.value = ''
  availableTimes.value = []

  if (!props.selectedProfessional || !form.value.start_date) return

  try {
    const dateFormatted = formatDateForAPI(form.value.start_date)

    const res = await fetch(
      `http://127.0.0.1:8000/api/schedules/available_hours/?employee_id=${props.selectedProfessional.id}&date=${dateFormatted}`
    )

    if (!res.ok) throw new Error('Erro ao buscar horários')

    const data = await res.json()
    availableTimes.value = data.available_hours || []
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao buscar horários disponíveis.'
  }
}

watch(
  [() => form.value.start_date, () => props.selectedProfessional],
  fetchAvailableTimes
)

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
    const dateFormatted = formatDateForAPI(form.value.start_date)

    const res = await fetch('http://127.0.0.1:8000/api/schedules/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_date: dateFormatted,
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
    form.value = { start_date: '', start_time: '', customer_name: '', customer_email: '', customer_phone: '' }
    availableTimes.value = []
  } catch (err) {
    error.value = err.message
  }
}
</script>