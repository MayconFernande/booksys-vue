<template>
  <footer class="bg-gray-800 text-white mt-10">
    <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

      <div>
        <p><BusinessInfo /></p>
        <a 
            href="https://www.livroreclamacoes.pt" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-block mt-4"
        >
            <img 
            src="/src/assets/images/livro_reclamacoes01.png" 
            alt="Livro de Reclamações" 
            class="h-8"
            />
        </a>
      </div>

      
      <div class="flex flex-col items-center">
        <img src="/src/assets/images/logo.png" alt="Logo" class="h-16 mb-2" />
        <h5 class="text-lg font-bold">BookSys, Seu estúdio de beleza moderno.</h5>
        <p class="text-xs mt-2">© 2025 BookSys. Todos os direitos reservados.</p>
      </div>

      
      <div class="flex flex-col md:items-end space-y-2">
        <router-link to="/" class="hover:underline">Início</router-link>
        <router-link to="/sobre" class="hover:underline">Sobre Nós</router-link>
        <router-link to="/contato" class="hover:underline">Localização</router-link>
        <router-link to="/politica-de-privacidade" class="hover:underline">Política de Privacidade</router-link>
      </div>

    </div>
  </footer>
</template>

<script setup>
import BusinessInfo from '../components/BusinessInfo.vue'
</script>

<style scoped>
/* estilos extras opcionais */
</style>
