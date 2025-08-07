<template>
  <div
    v-if="!accepted"
    class="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-sm p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg"
  >
    <div class="mb-2 md:mb-0 md:mr-4 text-center md:text-left">
      Este site usa cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
      <router-link
        to="/politica-de-privacidade"
        class="underline text-yellow-400 hover:text-yellow-300 ml-1"
      >
        Política de Privacidade
      </router-link>.
    </div>
    <button
      @click="acceptCookies"
      class="bg-blue-500 hover:bg-blue-600 text-black font-semibold px-4 py-2 rounded mt-2 md:mt-0"
    >
      Aceitar
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const accepted = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  accepted.value = consent === 'true'
})

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'true')
  accepted.value = true
}
</script>

<style scoped>
/* Opcional: você pode customizar ainda mais */
</style>
