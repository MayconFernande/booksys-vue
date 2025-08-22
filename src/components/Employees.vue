<template>
  <v-container v-if="professionals.length" class="py-4">
    <v-row dense justify="center" align="stretch" class="gap-4">
      <v-col
        v-for="prof in professionals"
        :key="prof.id"
        cols="auto"
        class="d-flex"
      >
        <v-card
          :elevation="selectedProfessional?.id === prof.id ? 8 : 2"
          class="pa-4 text-center cursor-pointer"
          :color="selectedProfessional?.id === prof.id ? 'grey lighten-4' : 'white'"
          @click="$emit('select', prof)"
        >
          <v-avatar size="80" class="mx-auto mb-2">
            <v-img :src="prof.photo || defaultImg" :alt="'Imagem do profissional ' + prof.first_name" />
          </v-avatar>
          <div class="font-weight-medium">
            {{ prof.first_name }} {{ prof.last_name }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  professionals: Array,
  selectedProfessional: Object,
  defaultImg: { type: String, default: '/src/assets/images/default-user.png' }
})
</script>
