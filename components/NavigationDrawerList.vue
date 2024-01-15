<script setup>
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';

import { useUIStore } from '@/stores/ui';

const
  { mobile } = useDisplay(),
  storeUI = useUIStore(),

  { leftDrawer } = storeToRefs(storeUI)

  if(mobile.value) leftDrawer.value = false

const
  items = ref([
    { title: 'Home' },
    { type: 'divider' },
    { type: 'subheader', title: 'Admin Panel' },
    { title: 'Admin Access' },
    { title: 'Season Management' },
    { title: 'User Management' },
    { type: 'divider' },
    { type: 'subheader', title: 'Data Monitoring' },
    { title: 'Progress Monitor' },
  ])
</script>

<template>
  <v-navigation-drawer v-model="leftDrawer" :permanent="!mobile">
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-home-variant-outline" />
        </template>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-divider class="my-4"/>

      <v-list-subheader>Admin Panel</v-list-subheader>

      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-key-variant" />
        </template>

        <v-list-item-title>Admin Access</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>
