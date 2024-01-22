<script setup>
useHead({
  title: 'Admin'
})

definePageMeta({
  layout: 'user',
  auth: true,
  admin: true
})
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">
        Admin
      </v-col>
    </v-row>
  </v-container>
</template>
