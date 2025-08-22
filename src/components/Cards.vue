<template>
  <v-card
    class="mx-auto transition-all duration-75 hover:scale-20 shadow-md"
    color="surface"
    max-width="100"
    
  >
    <v-img
      :src="props.src"
      height="50x"
      cover
    ></v-img>

    <v-card-title class="text-lg font-bold text-gray-900 ">
      {{ props.title }}
    </v-card-title>

    <v-card-text class="text-sm text-gray-700 px-4 pb-2 whitespace-pre-line">
      {{ props.text }}
    </v-card-text>

    <v-card-text v-if="props.duration" class="text-sm px-2 pb-2">
      <strong>Duração:</strong> {{ props.duration }} minutos
    </v-card-text>
  </v-card>

  <!-- PROFISSIONAIS -->
  <div v-if="showDetails" class="flex flex-wrap gap-4 justify-center mt-4">
    <div
      v-for="(item, index) in (Array.isArray(professionals) ? professionals : [])"
      :key="index"
      class="w-full sm:w-auto"
    >
      <div class="h-full shadow-sm flex items-center">
        <div class="flex items-center gap-4 px-6 py-4 bg-white rounded-lg">
          <img
            :src="item.src_img"
            class="w-16 h-16 object-cover rounded-full border-2 border-white shadow"
            :alt="`Foto de ${item.name}`"
          />
          <div>
            <div class="text-base font-semibold text-gray-800">{{ item.name }}</div>
            <div class="text-sm text-gray-500">Especialidade</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Título Padrão' },
  text: { type: String, default: 'Texto padrão do card.' },
  src: { type: String, default: '/src/assets/images/default-user.png' },
  duration: { type: String, default: '' },
  professionals: {
    type: Array,
    default: () => []
  }
})


const showDetails = ref(false)
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>


