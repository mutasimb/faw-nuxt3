<script setup>
import LogoFAW from '~/assets/img/logos/faw-logo.png'
import LogoGOB from '~/assets/img/logos/gob.png'

import LogoUSAID from '~/assets/img/logos/usaid.png'
import LogoDAE from '~/assets/img/logos/dae.png'
import LogoCIMMYT from '~/assets/img/logos/cimmyt.png'
import LogoCSISA from '~/assets/img/logos/csisa.png'
import LogoBWMRI from '~/assets/img/logos/bwmri.png'
import LogoBARI from '~/assets/img/logos/bari.png'
import LogoBRRI from '~/assets/img/logos/brri.png'

const route = useRoute()

const partners = [
  { href: 'https://www.usaid.gov/', src: LogoUSAID, label: 'USAID' },
  { href: 'http://dae.gov.bd/', src: LogoDAE, label: 'DAE' },
  { href: 'https://www.cimmyt.org/', src: LogoCIMMYT, label: 'CIMMYT' },
  { href: 'https://csisa.org/', src: LogoCSISA, label: 'CSISA' },
  { href: 'http://www.bwmri.gov.bd/', src: LogoBWMRI, label: 'BWMRI' },
  { href: 'http://www.bari.gov.bd/', src: LogoBARI, label: 'BARI' },
  { href: 'http://www.brri.gov.bd/', src: LogoBRRI, label: 'BRRI' }
]
</script>

<template>
  <v-app-bar flat :border="route.name !== 'index'">
    <template #prepend>
      <v-avatar>
        <v-img :src="LogoFAW" />
      </v-avatar>
    </template>

    <v-app-bar-title class="font-weight-bold">FAW Monitor</v-app-bar-title>

    <template #append v-if="route.name === 'index'">
      <v-menu>
        <template #activator="{ props }">
          <v-btn variant="text" v-bind="props" append-icon="mdi-chevron-down">Partners</v-btn>
        </template>

        <v-list density="comfortable">
          <v-list-item v-for="partner in partners" :key="partner.label" :href="partner.href"
            target="_blank">
            <template #prepend>
              <v-avatar rounded="0"><v-img :src="partner.src"/></v-avatar>
            </template>

            <v-list-item-title>{{ partner.label }}</v-list-item-title>

          </v-list-item>
        </v-list>
      </v-menu>

      <v-avatar>
        <v-img :src="LogoGOB" />
      </v-avatar>
    </template>

    <template #append v-else>
      <v-btn variant="text" href="/">Home</v-btn>
    </template>
  </v-app-bar>
</template>
