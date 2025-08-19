<template>
  <v-list dense nav class="pa-0">
    <!-- Telefone -->
    <v-list-item
      v-if="info.phone"
      :href="`tel:${info.phone}`"
      target="_self"
      link
    >
      <template #prepend>
        <v-icon>mdi-phone</v-icon>
      </template>
      <span>{{ info.phone }}</span>
      <v-tooltip location="bottom" activator="parent">
        {{ info.phone }}
      </v-tooltip>
    </v-list-item>

    <!-- Endereço -->
    <v-list-item
      v-if="info.address"
      :href="googleMapsUrl"
      target="_blank"
      rel="noopener"
      link
    >
      
        <v-icon>mdi-map-marker</v-icon>
      
      <span>{{ info.address }}</span>
      <v-tooltip location="bottom" activator="parent">
        {{ info.address }}
      </v-tooltip>
    </v-list-item>

    <!-- Horários -->
    <v-list-item
      v-if="info.opening_time || info.closing_time"
      link
    >
      <template #prepend>
        <v-icon>mdi-clock-outline</v-icon>
      </template>
      <span>{{ horarioFormatado }}</span>
      <v-tooltip location="bottom" activator="parent">
        {{ horarioFormatado }}
      </v-tooltip>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const info = ref({
  phone: null,
  address: null,
  opening_time: null,
  closing_time: null,
})

const hhmm = (t) => (t ? t.slice(0, 5) : '')

const horarioFormatado = computed(() => {
  const ab = hhmm(info.value.opening_time)
  const fe = hhmm(info.value.closing_time)
  if (ab && fe) return `Aberto: ${ab}–${fe}`
  if (ab) return `Abre às ${ab}`
  if (fe) return `Fecha às ${fe}`
  return 'Horário não informado'
})

const googleMapsUrl = computed(() =>
  info.value.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.value.address)}`
    : '#'
)

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
