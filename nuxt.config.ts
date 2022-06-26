import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Awesome File Sharing',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [],
      link: [],
      style: [],
    },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  components: {
    dirs: [
      '~/components',
      '~/features/downloads/components',
      '~/features/files/components',
      '~/features/requests/components',
    ],
  },
  buildModules: ['@pinia/nuxt'],
});
