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
    "@vite-pwa/nuxt",
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
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Fall Armyworm Monitor',
      short_name: 'faw-monitor',
      theme_color: '#ffffff',
      icons: [
        { src: 'img/logos-app/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { src: 'img/logos-app/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { src: 'img/logos-app/favicon-72x72.png', sizes: '72x72', type: 'image/png' },
        { src: 'img/logos-app/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: 'img/logos-app/favicon-128x128.png', sizes: '128x128', type: 'image/png', },
        { src: 'img/logos-app/favicon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'any maskable' },
        { src: 'img/logos-app/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: 'img/logos-app/favicon-152x152.png', sizes: '152x152', type: 'image/png' },
        { src: 'img/logos-app/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'img/logos-app/favicon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'img/logos-app/favicon-512x512.png', sizes: '512x512', type: 'image/png' }
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: process.env.NODE_ENV === 'development'
            ? /^http:\/\/localhost:3000\/api\/.*/i
            : /^https:\/\/faw-monitor\.onrender\.com\/api\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'backend-api-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 14 },
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
});
