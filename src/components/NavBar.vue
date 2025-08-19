<template>
  <v-app-bar color="primary" elevate-on-scroll flat>
    <!-- Menu Mobile -->
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none" />

    <!-- Logo -->
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          src="/src/assets/images/coloracao-grande.jpeg"
          alt="Logo"
          height="40"
          width="40"
          class="rounded-circle"
        />
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- Links Desktop -->
    <v-toolbar-items class="d-none d-sm-flex">
      <v-btn
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        text
        :class="item.current ? 'white--text' : 'white--text text--secondary'"
      >
        {{ item.name }}
      </v-btn>
      <v-btn
        to="/agendamento"
        color="yellow darken-2"
        rounded
        elevation="2"
        class="ml-4"
      >
        Agendar Serviço
      </v-btn>
    </v-toolbar-items>

    <!-- Ícones sociais -->
    <Social class="d-none d-sm-flex ml-2" />


  </v-app-bar>
  <!-- Drawer Mobile -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-list-item
      v-for="item in navigation"
      :key="item.name"
      :to="item.href"
      @click="drawer = false"
    >
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>

    <v-list-item to="/agendamento" @click="drawer = false">
      <v-list-item-title>Agendar Serviço</v-list-item-title>
    </v-list-item>
  
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import Social from './Social.vue'

const drawer = ref(false)

const navigation = [
  { name: 'Serviços', href: '/servicos', current: false },
]
</script>