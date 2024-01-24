<script setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

useHead({
  title: 'User'
})

definePageMeta({
  layout: 'user',
  auth: true
})

const
  storeUser = useUserStore(),
  { user } = storeToRefs(storeUser)
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">
        <pre>{{ user }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>
