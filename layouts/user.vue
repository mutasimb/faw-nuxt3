<script setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

const
  storeUser = useUserStore(),
  { user } = storeToRefs(storeUser)

storeUser.getUser()
</script>

<template>
  <v-app v-if="!(!user)" full-height class="bg-grey-lighten-5">
    <AppBarUser />

    <NavigationDrawerList />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
