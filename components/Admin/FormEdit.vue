<script setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { useAdminStore } from '@/stores/admin';

const
  storeUser = useUserStore(),
  storeAdmin = useAdminStore(),
  {
    id,
    name,
    role,
    title,
    org,
    phone,

    displayDialogEdit
  } = storeToRefs(storeAdmin),
  { user } = storeToRefs(storeUser)
</script>

<template>
  <v-dialog width="360" v-model="displayDialogEdit">

    <v-card title="Edit Admin User">

      <v-form @submit.prevent="async () => {
        try {
          await storeAdmin.postEditAdmin()
          displayDialogEdit = false

          id = ''

          name = ''
          role = null
          title = ''
          org = ''
          phone = ''
        } catch (error) {
          console.error(error)
        }
      }">

        <v-card-text>
          <v-text-field v-model="name" label="Name" variant="outlined" />
          <v-select v-model="role" label="Role" variant="outlined" :items="['Moderator', 'User Manager']"/>
          <v-text-field v-model="title" label="Title" variant="outlined" />
          <v-text-field v-model="org" label="Organization" variant="outlined" />
          <v-text-field v-model="phone" label="Phone" variant="outlined" type="number" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            variant="text"
            text="Dismiss"
            @click="() => {
              displayDialogEdit = false

              id = ''
              name = ''
              role = null
              title = ''
              org = ''
              phone = ''
            }" />
          <v-btn
            color="black"
            variant="flat"
            text="Submit"
            type="submit"
          />
        </v-card-actions>

      </v-form>

    </v-card>
  </v-dialog>
</template>
