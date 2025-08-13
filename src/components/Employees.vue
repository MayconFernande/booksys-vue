<template>
  <div v-if="professionals.length">
    <div class="flex flex-wrap gap-4 mb-6 justify-center">
      <div
        v-for="prof in professionals"
        :key="prof.id"
        @click="$emit('select', prof)"
        :class="[
          'cursor-pointer border rounded-lg p-4 w-48 text-center',
          selectedProfessional?.id === prof.id
            ? 'bg-blue-100 border-blue-500 shadow-md'
            : 'bg-white hover:bg-gray-100'
        ]"
      >
        <img :src="prof.photo || defaultImg" class="w-20 h-20 mx-auto mb-2 rounded-full object-cover border" :alt="'Imagem do profissional ' + prof.first_name" />
        <p class="font-semibold">{{ prof.first_name }} {{ prof.last_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  professionals: Array,
  selectedProfessional: Object,
  defaultImg: { type: String, default: '/src/assets/images/default-user.png' }
})
</script>
