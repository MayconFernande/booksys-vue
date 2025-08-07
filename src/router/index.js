// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'


import Home from '../pages/Home.vue'
import Sobre from '../pages/Sobre.vue'
import Servicos from '../pages/Servicos.vue'
import Contato from '../pages/Contato.vue'
import Agendamento from '../pages/Agendamento.vue'
import PoliticaDePrivacidade from '../pages/PoliticaDePrivacidade.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/sobre', component: Sobre },
  { path: '/servicos', component: Servicos },
  { path: '/contato', component: Contato },
  { path: '/politica-de-privacidade', component: PoliticaDePrivacidade },
  { path: '/agendamento', component: Agendamento },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
