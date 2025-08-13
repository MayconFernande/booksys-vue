<template>
  <div class="flex flex-wrap gap-4 mb-6 justify-center">
    <div
      v-for="service in services"
      :key="service.id"
      @click="$emit('select', service)"
      :class="[
        'cursor-pointer border rounded-lg p-4 w-56 text-center',
        selectedService?.id === service.id
          ? 'bg-green-100 border-green-500 shadow-md'
          : 'bg-white hover:bg-gray-100'
      ]"
    >
      <img :src="service.photo" class="w-20 h-20 mx-auto mb-2 rounded-full border" :alt="'Imagem do serviço ' + service.name" />
      <h3 class="font-semibold">{{ service.name }}</h3>
      <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
      <p class="text-xs text-gray-500 mt-2">Duração: {{ service.duration }} min</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  services: Array,
  selectedService: Object
})
</script>
