<template>
  <v-app full-height class="bg-grey-lighten-5">
    <AppBarUser />

    <NavigationDrawerList />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
