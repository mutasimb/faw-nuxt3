<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';

import LogoFAW from '~/assets/img/logos/faw-logo.png'

const
  storeAuth = useAuthStore(),
  storeUser = useUserStore(),
  storeUI = useUIStore(),

  { leftDrawer } = storeToRefs(storeUI),

  onLogOut = () => {
    storeAuth.logout()

    storeAuth.$reset()
    storeUser.$reset()
  }
</script>

<template>
  <v-app-bar flat border>

    <template #prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="leftDrawer = !leftDrawer" />

      <v-avatar>
        <v-img :src="LogoFAW" />
      </v-avatar>
    </template>

    <v-app-bar-title class="font-weight-bold">FAW Monitor</v-app-bar-title>

    <template #append>
      <v-btn variant="text" @click="onLogOut">Log out</v-btn>
    </template>

  </v-app-bar>
</template>
