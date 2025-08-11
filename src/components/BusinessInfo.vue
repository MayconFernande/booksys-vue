<template>
  <div class="flex items-center gap-3">
    <!-- Telefone -->
    <v-btn
      v-if="info.phone"
      :href="`tel:${info.phone}`"
      target="_self"
      density="comfortable"
      variant="text"
      color="primary"
      class="min-w-0"
      icon
    >
      <v-icon>mdi-phone</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ info.phone }}
      </v-tooltip>
    </v-btn>

    <!-- Endereço -->
    <v-btn
      v-if="info.address"
      :href="googleMapsUrl"
      target="_blank"
      rel="noopener"
      density="comfortable"
      variant="text"
      color="primary"
      class="min-w-0"
      icon
    >
      <v-icon>mdi-map-marker</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ info.address }}
      </v-tooltip>
    </v-btn>

    <!-- Horários -->
    <v-btn
      v-if="info.opening_time || info.closing_time"
      density="comfortable"
      variant="text"
      color="primary"
      class="min-w-0"
      icon
    >
      <v-icon>mdi-clock-outline</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ horarioFormatado }}
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const info = ref({
  phone: null,
  address: null,
  opening_time: null,
  closing_time: null,
})

const twoDigits = (n) => String(n).padStart(2, '0')
const hhmm = (t) => {
  if (!t) return ''
  return t.length >= 5 ? t.slice(0, 5) : t
}

const horarioFormatado = computed(() => {
  const ab = hhmm(info.value.opening_time)
  const fe = hhmm(info.value.closing_time)
  if (ab && fe) return `Aberto: ${ab}–${fe}`
  if (ab) return `Abre às ${ab}`
  if (fe) return `Fecha às ${fe}`
  return 'Horário não informado'
})

const googleMapsUrl = computed(() => {
  if (!info.value.address) return '#'
  const q = encodeURIComponent(info.value.address)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/api/info/')
    if (!res.ok) throw new Error('Falha ao buscar info')
    info.value = await res.json()
  } catch (err) {
    console.error('Erro ao buscar info da empresa:', err)
  }
})
</script>
