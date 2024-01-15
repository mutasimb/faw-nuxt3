import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import '@/assets/css/main.scss'

import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({})
  app.vueApp.use(vuetify)
})
