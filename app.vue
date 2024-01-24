<script setup>
useHead({
  titleTemplate: str => (str ? `${str} - ` : '') + 'Fall Armyworm Monitor'
})
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Snackbar/>
</template>
