<script setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { useSeasonsStore } from '@/stores/seasons';

const
  storeUser = useUserStore(),
  storeSeasons = useSeasonsStore(),
  { user } = storeToRefs(storeUser)

storeUser.getUser()
storeSeasons.getSeasons()
</script>

<template>
  <v-app v-if="!(!user)" full-height class="bg-grey-lighten-5">
    <AppBarUser />

    <NavDrawerLeftList />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
