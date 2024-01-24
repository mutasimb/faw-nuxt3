import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" }
      ]
    }
  },
  runtimeConfig: {
    hostDB: process.env.DB_HOST,
    nameDB: process.env.DB_NAME,
    userDB: process.env.DB_USER,
    passDB: process.env.DB_PASSWORD,
    secretJWT: process.env.JWT_SECRET,
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook(
        'vite:extendConfig',
        config => { config.plugins.push(vuetify({ autoImport: true })) }
      )
    },
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
