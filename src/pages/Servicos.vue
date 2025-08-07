<template>
  <div>
    <p class="text-5xl font-extrabold text-center uppercase tracking-wide 
      text-gray-900 py-6 border-b-4 border-gray-400 w-fit mx-auto">
      Serviços
    </p>

    <div class="flex flex-wrap justify-center gap-6 px-4 mb-12">
      <div v-for="(item, i) in items" :key="i">
        <Cards 
          :title="item.title" 
          :text="item.text" 
          :src="item.src" 
          :duration="item.duration" 
          :professionals="item.professionals" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cards from '../components/Cards.vue'

const items = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/services/')
    if (!response.ok) throw new Error('Erro ao carregar os serviços')
    
    const data = await response.json()

    items.value = data.map(service => ({
      title: service.name,
      text: service.description || 'Descrição não disponível',
      src: service.photo || '/src/assets/images/default-user.png', // <- Aqui está correto agora
      duration: String(service.duration),
      professionals: (service.professionals || []).map(p => ({
        id: p.id,
        name: p.name,
        src_img: p.src_img || '/src/assets/images/default-user.png'
      }))
    }))
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
  }
})
</script>
