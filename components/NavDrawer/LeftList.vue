<script setup>
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';

import { useUIStore } from '@/stores/ui';

const
  { mobile } = useDisplay(),
  storeUI = useUIStore(),

  { leftDrawer } = storeToRefs(storeUI)

leftDrawer.value = mobile.value ? false : true

const
  itemsAdmin = ref([
    {
      to: '/admin-user-access',
      icon: 'mdi-account-key-outline',
      title: 'User Access'
    },
    {
      to: '/admin-manage-seasons',
      icon: 'mdi-list-box-outline',
      title: 'Seasons Management'
    },
    {
      to: '/admin-manage-collectors',
      icon: 'mdi-account-group-outline',
      title: 'Data Collectors Management'
    },
  ])
</script>

<template>
  <v-navigation-drawer v-model="leftDrawer" :permanent="!mobile">
    <v-list>
      <v-list-item to="/user">
        <template v-slot:prepend>
          <v-icon icon="mdi-home-outline" />
        </template>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-divider class="my-4" />

      <v-list-subheader>Admin Panel</v-list-subheader>

      <v-list-item v-for="item in itemsAdmin" :key="item.title" :to="item.to">
        <template v-slot:prepend>
          <v-icon :icon="item.icon" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>
