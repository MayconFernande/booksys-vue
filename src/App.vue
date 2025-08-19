<script setup>
import NavBar from './components/NavBar.vue'
import CookieConsent from './components/CookieConsent.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-app>
    <NavBar />

    <v-main>
      <router-view />
    </v-main>

    <CookieConsent />
    <Footer />
  </v-app>
</template>
