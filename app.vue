<script setup>
useHead({
  titleTemplate: str => (str ? `${str} - ` : '') + 'Fall Armyworm Monitor'
})
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Snackbar/>
</template>
