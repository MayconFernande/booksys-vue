<template>
  <v-footer color="primary" class="white--text mt-10">
    <v-container class="py-8">
      <v-row dense>
        
        <v-col cols="10" md="4">
          <BusinessInfo />
          <v-btn
            icon
            href="https://www.livroreclamacoes.pt"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4"
          >
            <v-img
              src="/src/assets/images/livro_reclamacoes01.png"
              alt="Livro de Reclamações"
              height="32"
            />
          </v-btn>
        </v-col>

        
        <v-col cols="12" md="4" class="text-center">
          <v-img
            src="/src/assets/images/logo.png"
            alt="Logo"
            height="64"
            class="mb-2 mx-auto"
          />
          <div class="text-h6 font-weight-bold">
            BookSys, Seu estúdio de beleza moderno.
          </div>
          <div class="text-caption mt-2">
            © 2025 BookSys. Todos os direitos reservados.
          </div>
        </v-col>

        
        <v-col cols="12" md="4" class="d-flex flex-column md:align-end">
          <router-link to="/politica-de-privacidade" class="text-white text-decoration-none">Política de Privacidade</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import BusinessInfo from '../components/BusinessInfo.vue'
</script>
