<template>
  <v-sheet
    v-if="!accepted"
    color="primary"
    class="white--text"
    elevation="6"
    rounded="0"
    style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;"
  >
    <v-container>
      <v-row
        align="center"
        justify="space-between"
        class="py-3"
      >
        <v-col cols="12" md="8">
          <div class="text-sm text-center text-md-left">
            Este site usa cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
            <router-link
              to="/politica-de-privacidade"
              class="text-yellow-300 text-decoration-underline"
            >
              Política de Privacidade
            </router-link>.
          </div>
        </v-col>

        <v-col cols="12" md="auto" class="text-center md:text-right mt-2 md:mt-0">
          <v-btn
            color="yellow darken-2"
            dark
            rounded
            @click="acceptCookies"
          >
            Aceitar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
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
