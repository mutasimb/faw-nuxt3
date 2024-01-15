<script setup>
import { storeToRefs } from 'pinia';

const
  phone = ref(''),
  password = ref(''),

  pendingPhone = ref(false),
  pendingLogin = ref(false),
  isVerified = ref(false),

  storeAuth = useAuthStore(),
  { isPasswordDisabled } = storeToRefs(storeAuth),

  onNumber = async () => {
    pendingPhone.value = true

    await storeAuth.checkNumber({ phone: phone.value })
    isVerified.value = true

    pendingPhone.value = false
  },
  onLogin = async () => {
    pendingLogin.value = true

    await storeAuth.login({ phone: phone.value, password: password.value })

    pendingLogin.value = false
  }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">
        <v-card variant="outlined" class="bg-white w-100" style="max-width: 360px;">
          <v-card-item class="mb-4">
            <v-card-title>Login</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-text-field class="mt-2" v-model="phone" label="Phone Number" type="number" variant="outlined" :disabled="pendingPhone || pendingLogin" @update:modelValue="() => { isPasswordDisabled = true; isVerified = false; }">
              <template v-if="!isVerified" v-slot:append-inner>
                <v-btn icon="mdi-send" variant="text" @click="onNumber" :disabled="pendingPhone || pendingLogin"/>
              </template>
            </v-text-field>

            <v-text-field class="mt-2" v-model="password" label="Password" type="password" variant="outlined" :disabled="pendingLogin || isPasswordDisabled">
              <template v-if="isVerified" v-slot:append-inner>
                <v-btn icon="mdi-send" variant="text" :disabled="pendingLogin || isPasswordDisabled" @click="onLogin"/>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
